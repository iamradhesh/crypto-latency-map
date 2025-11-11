'use client';
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Settings,
  Globe,
  Activity,
  Cloud,
  Filter,
  TrendingUp,
  BarChart3,
  Menu,
  X as CloseIcon,
} from "lucide-react";
import HistoricalLatency from "@/component/HistoricLatency";

interface Exchange {
  name: string;
  lat: number;
  lon: number;
  provider: keyof typeof PROVIDER_COLORS;
  region: string;
}

const PROVIDER_COLORS = {
  AWS: 0xff9900,
  GCP: 0x4285f4,
  Azure: 0x0072c6,
};

const EXCHANGES: Exchange[] = [
  { name: "Binance", lat: 35.6762, lon: 139.6503, provider: "AWS", region: "ap-northeast-1" },
  { name: "Coinbase", lat: 37.7749, lon: -122.4194, provider: "GCP", region: "us-west1" },
  { name: "OKX", lat: 22.3193, lon: 114.1694, provider: "AWS", region: "ap-east-1" },
  { name: "Bybit", lat: 1.3521, lon: 103.8198, provider: "AWS", region: "ap-southeast-1" },
  { name: "Kraken", lat: 51.5074, lon: -0.1278, provider: "Azure", region: "uk-south" },
  { name: "Deribit", lat: 52.3676, lon: 4.9041, provider: "GCP", region: "europe-west4" },
  { name: "Bitfinex", lat: 40.7128, lon: -74.006, provider: "AWS", region: "us-east-1" },
  { name: "Gate.io", lat: 39.9042, lon: 116.4074, provider: "Azure", region: "china-east" },
  { name: "Huobi", lat: -33.8688, lon: 151.2093, provider: "AWS", region: "ap-southeast-2" },
  { name: "KuCoin", lat: 25.033, lon: 121.5654, provider: "GCP", region: "asia-east1" },
];

const generateLatency = () => Math.floor(Math.random() * 150) + 20;

const CryptoLatencyMap = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);
  const markersRef = useRef<THREE.Mesh[]>([]);
  const connectionsRef = useRef<THREE.Line[]>([]);

  const [hoveredMarker, setHoveredMarker] = useState<Exchange | null>(null);
  const [filterProvider, setFilterProvider] = useState("all");
  const [latencyData, setLatencyData] = useState<Record<string, number>>({});
  const [showConnections, setShowConnections] = useState(true);
  const [selectedExchange, setSelectedExchange] = useState<Exchange | null>(null);
  const [showHistorical, setShowHistorical] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
  };

  const createEarthTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#1a3a52";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2d5a3d";
    ctx.beginPath();
    ctx.ellipse(1000, 500, 800, 300, 0, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  };

  const addExchangeMarkers = (scene: THREE.Scene) => {
    markersRef.current = [];
    const filtered =
      filterProvider === "all"
        ? EXCHANGES
        : EXCHANGES.filter((e) => e.provider === filterProvider);

    filtered.forEach((exchange) => {
      const position = latLonToVector3(exchange.lat, exchange.lon, 82);
      const geometry = new THREE.ConeGeometry(2, 8, 4);
      const material = new THREE.MeshPhongMaterial({
        color: PROVIDER_COLORS[exchange.provider],
        emissive: PROVIDER_COLORS[exchange.provider],
        emissiveIntensity: 0.6,
      });
      const marker = new THREE.Mesh(geometry, material);
      marker.position.copy(position);
      marker.lookAt(0, 0, 0);
      marker.rotateX(Math.PI);
      marker.userData = exchange;
      scene.add(marker);
      markersRef.current.push(marker);
    });
  };

  const addConnections = (scene: THREE.Scene) => {
    connectionsRef.current = [];
    for (let i = 0; i < EXCHANGES.length - 1; i++) {
      const start = latLonToVector3(EXCHANGES[i].lat, EXCHANGES[i].lon, 82);
      const end = latLonToVector3(EXCHANGES[i + 1].lat, EXCHANGES[i + 1].lon, 82);
      const curve = new THREE.QuadraticBezierCurve3(
        start,
        new THREE.Vector3().addVectors(start, end).multiplyScalar(0.6),
        end
      );
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const latency = generateLatency();
      const color = latency < 50 ? 0x00ff00 : latency < 100 ? 0xffff00 : 0xff0000;
      const material = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      connectionsRef.current.push(line);
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 350 : 300;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    const globeGeometry = new THREE.SphereGeometry(80, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      map: createEarthTexture(),
      transparent: true,
      opacity: 0.95,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    globeRef.current = globe;

    addExchangeMarkers(scene);
    if (showConnections) addConnections(scene);

    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let velocity = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        velocity.x = dy * 0.005;
        velocity.y = dx * 0.005;
        prevMouse = { x: e.clientX, y: e.clientY };
      }

      if (!isMobile) {
        const rect = renderer.domElement.getBoundingClientRect();
        const mouse = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(markersRef.current);
        if (intersects.length > 0) {
          const marker = intersects[0].object as THREE.Mesh;
          setHoveredMarker(marker.userData);
          document.body.style.cursor = "pointer";
        } else {
          document.body.style.cursor = "default";
          setHoveredMarker(null);
        }
      }
    };

    const onMouseUp = () => (isDragging = false);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - prevMouse.x;
        const dy = e.touches[0].clientY - prevMouse.y;
        velocity.x = dy * 0.005;
        velocity.y = dx * 0.005;
        prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.1;
      camera.position.z = Math.max(150, Math.min(500, camera.position.z));
    };

    const onClick = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.changedTouches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.changedTouches[0].clientY : e.clientY;
      
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markersRef.current);

      if (intersects.length > 0) {
        const marker = intersects[0].object as THREE.Mesh;
        setSelectedExchange(marker.userData);
        setShowHistorical(true);
        if (isMobile) setShowControls(false);
      }
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    renderer.domElement.addEventListener("touchmove", onTouchMove);
    renderer.domElement.addEventListener("touchend", onTouchEnd);
    renderer.domElement.addEventListener("wheel", onWheel);
    renderer.domElement.addEventListener("click", onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      if (globe) {
        globe.rotation.y += velocity.y;
        globe.rotation.x += velocity.x;
        globe.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, globe.rotation.x));
        velocity.x *= 0.95;
        velocity.y *= 0.95;
        if (!isDragging && Math.abs(velocity.y) < 0.001) globe.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      renderer.domElement.removeEventListener("touchend", onTouchEnd);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("click", onClick);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [filterProvider, showConnections, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLatency: Record<string, number> = {};
      EXCHANGES.forEach((ex) => (newLatency[ex.name] = generateLatency()));
      setLatencyData(newLatency);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 to-transparent p-3 md:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2 md:gap-3">
            <Globe className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
            <div>
              <h1 className="text-base md:text-2xl font-bold">
                {isMobile ? "Latency Monitor" : "Crypto Exchange Latency Monitor"}
              </h1>
              <p className="text-xs md:text-sm text-gray-400 hidden sm:block">
                Real-time infrastructure monitoring
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {isMobile && (
              <button
                onClick={() => setShowControls(!showControls)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                {showControls ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            {!isMobile && (
              <>
                <button
                  onClick={() => setShowHistorical(!showHistorical)}
                  className={`p-2 rounded-lg transition ${
                    showHistorical ? "bg-blue-600" : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
                  <Settings className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div ref={mountRef} className="w-full h-full" />

      {/* Controls - Responsive */}
      <div
        className={`absolute ${
          isMobile
            ? showControls
              ? "top-16 left-0 right-0 mx-3"
              : "-top-96"
            : "top-20 md:top-24 right-3 md:right-6"
        } w-auto ${
          isMobile ? "max-w-full" : "md:w-80"
        } bg-gray-900/95 rounded-xl p-4 md:p-5 backdrop-blur-sm shadow-2xl border border-gray-800 transition-all duration-300 z-20`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
          <h2 className="text-base md:text-lg font-semibold">Controls</h2>
        </div>

        <label className="text-xs md:text-sm text-gray-400 mb-2 block">Cloud Provider</label>
        <select
          className="w-full bg-gray-800 rounded-lg p-2 text-xs md:text-sm border border-gray-700 mb-4"
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
        >
          <option value="all">All</option>
          <option value="AWS">AWS</option>
          <option value="GCP">GCP</option>
          <option value="Azure">Azure</option>
        </select>

        <label className="flex items-center gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={showConnections}
            onChange={(e) => setShowConnections(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-xs md:text-sm">Show Connections</span>
        </label>

        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-xs md:text-sm font-semibold mb-3 flex items-center gap-2">
            <Cloud className="w-3 h-3 md:w-4 md:h-4" />
            Provider Legend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
            {Object.entries(PROVIDER_COLORS).map(([provider, color]) => (
              <div key={provider} className="flex items-center gap-2 text-xs md:text-sm">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `#${color.toString(16).padStart(6, "0")}` }}
                />
                <span>{provider}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <h3 className="text-xs md:text-sm font-semibold mb-3 flex items-center gap-2">
            <Activity className="w-3 h-3 md:w-4 md:h-4" />
            Active Exchanges
          </h3>
          <div className="text-xl md:text-2xl font-bold text-blue-400">{EXCHANGES.length}</div>
        </div>

        {isMobile && (
          <button
            onClick={() => {
              setShowHistorical(!showHistorical);
              setShowControls(false);
            }}
            className="w-full mt-4 p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            View Historical Data
          </button>
        )}
      </div>

      {/* Hover tooltip - Desktop only */}
      {!isMobile && hoveredMarker && (
        <div className="absolute bottom-20 md:bottom-6 left-3 md:left-6 bg-gray-900/95 rounded-lg p-3 md:p-4 backdrop-blur-sm shadow-xl border border-gray-800 max-w-xs">
          <h3 className="font-semibold text-base md:text-lg mb-2">{hoveredMarker.name}</h3>
          <div className="text-xs md:text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Provider:</span>
              <span
                style={{
                  color: `#${PROVIDER_COLORS[hoveredMarker.provider].toString(16).padStart(6, "0")}`,
                }}
              >
                {hoveredMarker.provider}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Region:</span>
              <span>{hoveredMarker.region}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Latency:</span>
              <span className="text-green-400">
                {latencyData[hoveredMarker.name] || "--"} ms
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Historical Panel - Responsive */}
      {showHistorical && selectedExchange && (
        <div className={`absolute ${
          isMobile
            ? "inset-0 z-30 p-3 overflow-y-auto bg-gray-950"
            : "top-20 md:top-24 left-3 md:left-6 z-20"
        }`}>
          <HistoricalLatency
            selectedExchange={selectedExchange}
            onClose={() => setShowHistorical(false)}
            allExchanges={EXCHANGES}
          />
        </div>
      )}

      {/* Bottom Stats - Responsive */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-2 md:p-4 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex gap-3 md:gap-6 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full" />
              <span className="text-[10px] md:text-sm">&lt;50ms</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full" />
              <span className="text-[10px] md:text-sm">50–100ms</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full" />
              <span className="text-[10px] md:text-sm">&gt;100ms</span>
            </div>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-gray-400">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm">Refreshes every 5s</span>
          </div>
        </div>
      </div>

      {/* Mobile Instruction */}
      {isMobile && !showHistorical && !showControls && (
        <div className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none z-10">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-gray-300 animate-pulse">
            👆 Tap any marker to view details
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoLatencyMap;