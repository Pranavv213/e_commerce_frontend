import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import boy from './assets/boy.png';

const firebaseConfig = {
  apiKey: "AIzaSyBt3AWx7yhG1-EukcuLbmilwTBaXoknutQ",
  authDomain: "ecommerceagent-af9b7.firebaseapp.com",
  projectId: "ecommerceagent-af9b7",
  storageBucket: "ecommerceagent-af9b7.firebasestorage.app",
  messagingSenderId: "258930880365",
  appId: "1:258930880365:web:42fa8f56554d7d504af464",
  measurementId: "G-0Y77D8QDV6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const API_BASE_URL = "http://127.0.0.1:8000";
const AGENT_GATEWAY_URL = "http://localhost:8001"; 

const styles = {
  body: { 
    backgroundColor: '#0e1117', 
    color: '#e3e3e3', 
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif', 
    minHeight: '100vh', 
    margin: 0, 
    paddingBottom: '40px'
  },
  nav: { 
    backgroundColor: '#13161c', 
    borderBottom: '1px solid #21262d', 
    position: 'sticky', 
    top: 0, 
    zIndex: 50 
  },
  navContainer: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { 
    width: '32px', 
    height: '32px', 
    background: 'linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%)', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: '16px',
    boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)'
  },
  logoText: { fontWeight: '700', fontSize: '20px', margin: 0, color: '#fff', letterSpacing: '-0.02em' },
  logoSubtext: { margin: 0, fontSize: '11px', color: '#8b949e', fontWeight: '400' },
  grid: { maxWidth: '1200px', margin: '32px auto 0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '24px' },
  card: { 
    backgroundColor: '#171b22', 
    borderRadius: '16px', 
    border: '1px solid #21262d', 
    overflow: 'hidden', 
    display: 'flex', 
    flexDirection: 'column', 
    height: 'fit-content' 
  },
  cardHeader: { padding: '20px 24px', borderBottom: '1px solid #21262d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { margin: 0, fontSize: '16px', fontWeight: '600', color: '#f0f6fc' },
  cardSubtitle: { margin: '4px 0 0 0', fontSize: '12px', color: '#8b949e' },
  cardBody: { padding: '24px' },
  profileBadge: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: '#0e1117', borderRadius: '12px', border: '1px solid #21262d' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #1d4ed8 0%, #7e22ce 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  balanceBanner: { 
    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05) 0%, rgba(56, 189, 248, 0.01) 100%)', 
    border: '1px solid rgba(56, 189, 248, 0.2)', 
    borderRadius: '14px', 
    padding: '20px', 
    textAlign: 'center', 
    marginBottom: '20px'
  },
  balanceLabel: { fontSize: '11px', fontWeight: '600', color: '#38bdf8', letterSpacing: '0.05em', textTransform: 'uppercase' },
  balanceValue: { fontSize: '30px', fontWeight: '700', color: '#fff', margin: '6px 0 0 0' },
  btnPrimary: { backgroundColor: '#1f6feb', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', flex: 1 },
  btnSecondary: { backgroundColor: 'transparent', color: '#f85149', border: '1px solid #f85149', padding: '12px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', flex: 1 },
  catalogList: { padding: '0 24px', maxHeight: '580px', overflowY: 'auto' },
  catalogRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: '20px 0', borderBottom: '1px solid #21262d', flexWrap: 'wrap' },
  imgContainer: { width: '80px', height: '80px', backgroundColor: '#0e1117', border: '1px solid #21262d', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '8px', boxSizing: 'border-box' },
  tag: { fontSize: '10px', fontWeight: '600', color: '#58a6ff', backgroundColor: 'rgba(88, 166, 255, 0.1)', padding: '2px 8px', borderRadius: '20px', border: '1px solid rgba(88, 166, 255, 0.15)' },
  itemName: { margin: '6px 0 2px 0', fontSize: '15px', fontWeight: '600', color: '#f0f6fc' },
  itemPrice: { fontSize: '15px', fontWeight: '600', color: '#58a6ff' },
  selectQuantity: { padding: '8px 10px', borderRadius: '10px', backgroundColor: '#0f172a', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', cursor: 'pointer' },
  btnAdd: { background: '#1f6feb', color: '#fff', border: 'none', padding: '9px 18px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' },
  orderBox: { padding: '14px', backgroundColor: '#0e1117', border: '1px solid #21262d', borderRadius: '12px', marginBottom: '12px' },
  btnCancel: { width: '100%', padding: '8px', backgroundColor: 'transparent', color: '#f85149', border: '1px solid rgba(248, 81, 73, 0.3)', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', marginTop: '8px', transition: 'all 0.2s' },
  
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(9, 11, 15, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#13161c', border: '1px solid #21262d', padding: '24px', borderRadius: '24px', width: '92%', maxWidth: '680px', height: '85vh', maxHeight: '750px', display: 'flex', flexDirection: 'column' },
  chatLogsArea: { flex: 1, overflowY: 'auto', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '24px', paddingRight: '8px' },
  
  bubbleUser: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#282a36', 
    color: '#e3e3e3', 
    padding: '12px 18px', 
    borderRadius: '18px', 
    fontSize: '14px', 
    maxWidth: '75%',
    lineHeight: '1.5'
  },
  bubbleAgent: { 
    alignSelf: 'flex-start', 
    backgroundColor: 'transparent', 
    color: '#e3e3e3', 
    padding: '4px 0px 4px 40px', 
    fontSize: '14px', 
    maxWidth: '100%',
    lineHeight: '1.6',
    position: 'relative'
  },
  chatForm: { 
    display: 'flex', 
    gap: '8px', 
    backgroundColor: '#1e232b', 
    borderRadius: '32px', 
    padding: '6px 6px 6px 18px',
    alignItems: 'center',
    border: '1px solid transparent',
    transition: 'border-color 0.2s'
  },
  modalInput: { 
    flex: 1, 
    padding: '10px 0', 
    backgroundColor: 'transparent', 
    border: 'none', 
    color: '#fff', 
    outline: 'none', 
    fontSize: '14px' 
  },
  btnSend: { 
    background: 'linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%)', 
    color: '#fff', 
    border: 'none', 
    width: '40px',
    height: '40px',
    borderRadius: '50%', 
    fontWeight: '700', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hitlContainer: { backgroundColor: '#1c1212', border: '1px solid #f85149', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' },
  
  guideContainer: { 
    padding: '12px 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '16px',
    maxHeight: '180px',
    overflowY: 'auto'
  },
  guideItem: { 
    display: 'flex', 
    flexDirection: 'column',
    padding: '12px',
    backgroundColor: '#1e232b',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.2s',
    border: '1px solid #21262d'
  },
  guideExample: { 
    fontSize: '13px', 
    color: '#58a6ff',
    fontWeight: '500',
    marginBottom: '4px'
  },
  guideDescription: { 
    fontSize: '11px', 
    color: '#8b949e'
  }
};

function App() {
  const [activeUserId, setActiveUserId] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [itemError, setItemError] = useState("");
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInputValue, setModalInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'agent', text: 'Hello! I am your AI Store Assistant. Tell me what you are looking for, ask to buy items, or manage your active orders seamlessly.' }
  ]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const [pendingApproval, setPendingApproval] = useState(null);

  const [showGiftModal, setShowGiftModal] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);
  const [showAgentGuide, setShowAgentGuide] = useState(true);

  const messagesEndRef = useRef(null);

  const agentGuideExamples = [
    { icon: '💰', example: 'What is my balance?', description: 'Check your current wallet standing' },
    { icon: '📦', example: 'Show me all items', description: 'Display available catalog products' },
    { icon: '🛒', example: 'Buy me 2 Coca Cola cans', description: 'Initiate a quick purchase pipeline' },
    { icon: '↩️', example: 'Cancel my last order', description: 'Reverse recent delivery queue dispatch' }
  ];

  useEffect(() => {
    const css = `
      @media (min-width: 992px) {
        .responsive-main-grid { display: grid !important; grid-template-columns: repeat(12, 1fr) !important; }
        .col-left { grid-column: span 4 !important; }
        .col-mid { grid-column: span 5 !important; }
        .col-right { grid-column: span 3 !important; }
      }
      @media (max-width: 480px) {
        .catalog-row-item { justify-content: center !important; text-align: center; }
        .catalog-row-controls { width: 100%; justify-content: center; margin-top: 8px; }
        .gemini-guide-grid { grid-template-columns: 1fr !important; }
      }
      .gemini-input-wrapper:focus-within {
        border-color: #58a6ff !important;
      }
      .agent-avatar-decor::before {
        content: '✨';
        position: absolute;
        left: 8px;
        top: 6px;
        font-size: 16px;
        background: linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .btn-gemini-glow:hover {
        opacity: 0.9;
        box-shadow: 0 0 15px rgba(0, 210, 255, 0.4);
      }
      .card-btn-action:hover {
        background-color: #21262d !important;
        transform: translateY(-1px);
      }
      .guide-card-hover:hover {
        background-color: #282a36 !important;
        transform: translateY(-1px);
      }
      @keyframes fallAnimation {
        0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
      
      /* Gemini Style Custom Loader */
      .gemini-loader {
        display: flex;
        gap: 6px;
        padding: 12px 0;
        align-items: center;
      }
      .gemini-loader-dot {
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%);
        border-radius: 50%;
        animation: geminiBounce 1.4s infinite ease-in-out both;
      }
      .gemini-loader-dot:nth-child(1) { animation-delay: -0.32s; }
      .gemini-loader-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes geminiBounce {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1.2); opacity: 1; }
      }
    `;
    const styleHead = document.createElement('style');
    styleHead.appendChild(document.createTextNode(css));
    document.head.appendChild(styleHead);
    return () => document.head.removeChild(styleHead);
  }, []);

  useEffect(() => {
    if (isModalOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isModalOpen, pendingApproval, isAgentTyping]);

  useEffect(() => {
    loadMarketplace();
    const savedUserId = localStorage.getItem("app_user_id");
    if (savedUserId) setActiveUserId(savedUserId);
  }, []);

  useEffect(() => {
    if (activeUserId) fetchUserDetails(activeUserId);
    else setUserProfile(null);
  }, [activeUserId]);

  const triggerNativeConfettiBurst = () => {
    const particles = [];
    const colors = ['#7a22ff', '#00d2ff', '#1f6feb', '#f59e0b', '#ec4899'];
    for (let i = 0; i < 120; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    setConfettiParticles(particles);
    setTimeout(() => setConfettiParticles([]), 5500);
  };

  const handleLaunchCopilot = () => {
    const savedUserId = localStorage.getItem("app_user_id");
    if (!savedUserId) {
      alert("Sign up to continue.");
      return;
    }
    setIsModalOpen(true);
  };

  const loginWithFirebaseGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const savedUserId = localStorage.getItem("app_user_id");
      
      if (!savedUserId) {
        const generatedId = "user_" + Math.random().toString(36).substring(2, 11);
        localStorage.setItem("app_user_id", generatedId);
        await registerGoogleUserInBackend(generatedId, user.displayName, user.email);
        
        setShowGiftModal(true);
        triggerNativeConfettiBurst();
      } else {
        setActiveUserId(savedUserId);
      }
    } catch (error) { alert("Login Error: " + error.message); }
  };

  const logoutFromFirebase = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("app_user_id");
      setActiveUserId("");
    } catch (error) { console.error(error); }
  };

  const registerGoogleUserInBackend = async (userId, name, email) => {
    const newUserPayload = { user_id: userId, email: email, user_name: name, user_balance: 1000.00, orders: [], cancel_orders: [] };
    try {
      await fetch(`${API_BASE_URL}/users/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newUserPayload) });
      setActiveUserId(userId);
    } catch (err) { console.error(err); }
  };

  const loadMarketplace = async () => {
    setLoadingItems(true); setItemError("");
    try {
      const response = await fetch(`${API_BASE_URL}/items/`);
      if (!response.ok) throw new Error("Could not pull inventory mapping");
      const items = await response.json();
      setMarketplaceItems(items);
      const initialQuantities = {};
      items.forEach(item => { initialQuantities[item.item_name] = 1; });
      setSelectedQuantities(initialQuantities);
    } catch (err) { setItemError(`Failed to load items: ${err.message}`); }
    finally { setLoadingItems(false); }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`);
      if (response.ok) { const data = await response.json(); setUserProfile(data); }
    } catch (err) { console.error(err); }
  };

  const handleQuantityChange = (itemName, value) => {
    setSelectedQuantities(prev => ({ ...prev, [itemName]: parseInt(value) }));
  };

  const buyMarketplaceItem = async (name, price) => {
    if (!activeUserId) return alert("Please authenticate via Google before processing orders.");
    const qty = selectedQuantities[name] || 1;
    const totalPrice = parseFloat(price) * qty;
    if (userProfile && userProfile.user_balance < totalPrice) return alert("Insufficient balance.");

    const payload = { name, price: parseFloat(price), quantity: qty, timestamp: new Date().toISOString() };
    try {
      const response = await fetch(`${API_BASE_URL}/users/${activeUserId}/order/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (response.ok) {
        await fetch(`${API_BASE_URL}/users/${activeUserId}/balance/?amount=${-totalPrice}`, { method: "PATCH" });
        fetchUserDetails(activeUserId);
      }
    } catch (err) { console.error(err); }
  };

  const triggerCancellation = async (orderObject) => {
    if (!activeUserId) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${activeUserId}/move-to-cancelled/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderObject) });
      if (response.ok) {
        const refundAmount = parseFloat(orderObject.price) * parseInt(orderObject.quantity);
        await fetch(`${API_BASE_URL}/users/${activeUserId}/balance/?amount=${refundAmount}`, { method: "PATCH" });
        fetchUserDetails(activeUserId);
      }
    } catch (err) { console.error(err); }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!modalInputValue.trim() || pendingApproval || isAgentTyping) return;

    const currentUid = localStorage.getItem("app_user_id") || "guest_user_session";
    const userMessage = modalInputValue;

    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setModalInputValue("");
    setIsAgentTyping(true);

    try {
      const response = await fetch(`${AGENT_GATEWAY_URL}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUid, message: userMessage })
      });

      if (!response.ok) throw new Error(`Server returned error status: ${response.status}`);
      const data = await response.json();
      
      if (data.status === "success") {
        setChatHistory(prev => [...prev, { sender: 'agent', text: data.response }]);
        
        const approvalCheck = await fetch(`${AGENT_GATEWAY_URL}/api/agent/pending-approval/${currentUid}`);
        const approvalData = await approvalCheck.json();
        if (approvalData.has_pending) {
          setPendingApproval(approvalData);
        }
      }
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { sender: 'agent', text: "Error connecting to AI execution engine." }]);
    } finally {
      setIsAgentTyping(false);
    }
  };

  const resolveHumanApproval = async (action) => {
    const currentUid = localStorage.getItem("app_user_id") || "guest_user_session";
    try {
      const res = await fetch(`${AGENT_GATEWAY_URL}/api/agent/approval-action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUid, action: action })
      });
      const data = await res.json();
      
      setChatHistory(prev => [...prev, { sender: 'agent', text: data.message }]);
      setPendingApproval(null);
      fetchUserDetails(currentUid);
    } catch (err) { console.error(err); }
  };

  const handleExampleClick = (example) => {
    setModalInputValue(example);
  };

  return (
    <div style={styles.body}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '0px', overflow: 'visible', zIndex: 9999, pointerEvents: 'none' }}>
        {confettiParticles.map(p => (
          <div 
            key={p.id} 
            style={{
              position: 'absolute',
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size * 1.5}px`,
              backgroundColor: p.color,
              borderRadius: '2px',
              opacity: 0,
              animation: `fallAnimation 4s ease-out forwards`,
              animationDelay: `${p.delay}s`
            }} 
          />
        ))}
      </div>

      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}>✨</div>
            <div>
              <h1 style={styles.logoText}>OmniMind Shop</h1>
              <p style={styles.logoSubtext}>AI-Driven Neural E-Commerce Platform</p>
            </div>
          </div>
          <div>
            {activeUserId && (
              <button onClick={logoutFromFirebase} style={{...styles.btnSecondary, padding: '8px 16px', fontSize: '12px'}}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="responsive-main-grid" style={styles.grid}>
        <div className="col-left" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={styles.card}>
            <div style={styles.cardBody}>
              {!activeUserId ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', width: '100%' }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: '500', color: '#8b949e', textAlign: 'center' }}>
                    Access Secure Marketplace Infrastructure
                  </p>
                  <button 
                    onClick={loginWithFirebaseGoogle} 
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      backgroundColor: '#1f6feb',
                      color: '#fff',
                      border: 'none',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" style={{ display: 'block' }}>
                      <path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.79 2.7v2.24h2.9c1.69-1.55 2.69-3.85 2.69-6.57z" fill="#fff"/>
                      <path d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.58-5.05-3.71H.92v2.32C2.4 15.97 5.46 18 9 18z" fill="#fff" opacity="0.8"/>
                      <path d="M3.95 10.69c-.18-.54-.28-1.12-.28-1.69s.1-1.15.28-1.69V4.99H.92c-.6 1.2-0.95 2.57-0.95 4.01s.35 2.81.95 4.01l3.03-2.32z" fill="#fff" opacity="0.7"/>
                      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.3C13.46.87 11.43 0 9 0 5.46 0 2.4 2.03.92 4.99l3.03 2.32c.71-2.13 2.7-3.71 5.05-3.71z" fill="#fff" opacity="0.9"/>
                    </svg>
                    Authenticate with Google
                  </button>
                </div>
              ) : (
                <div style={styles.profileBadge}>
                  <div style={styles.avatar}>{userProfile?.user_name?.charAt(0) || 'U'}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff' }}>{userProfile?.user_name || "Syncing..."}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#8b949e', fontFamily: 'monospace' }}>{activeUserId}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Neural Balance Ledger</h2>
                <p style={styles.cardSubtitle}>Autonomous credit allocation</p>
              </div>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.balanceBanner}>
                <span style={styles.balanceLabel}>Available Balance</span>
                <h3 style={styles.balanceValue}>₹{userProfile ? userProfile.user_balance.toFixed(2) : "0.00"}</h3>
              </div>
              
              <button 
                className="btn-gemini-glow"
                onClick={handleLaunchCopilot}
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: 'none',
                  color: '#fff',
                  background: 'linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%)',
                  cursor: 'pointer',
                  borderRadius: '30px',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s'
                }}
              >
                <span>✨</span>
                <span>ASK COGNITIVE ASSISTANT</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-mid" style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>AI Optimized Marketplace Inventory</h2>
              <p style={styles.cardSubtitle}>Real-time stock pipelines</p>
            </div>
          </div>
          <div style={styles.catalogList}>
            {!loadingItems && marketplaceItems.map((item, idx) => (
              <div key={idx} className="catalog-row-item" style={styles.catalogRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'inherit' }}>
                  <div style={styles.imgContainer}>
                    <img src={item.image_url} alt={item.item_name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={styles.tag}>{item.category}</span>
                    <h4 style={styles.itemName}>{item.item_name}</h4>
                    <div style={styles.itemPrice}>₹{item.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-right" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={styles.card}>
            <div style={{...styles.cardHeader, borderLeft: '4px solid #00d2ff'}}>
              <h2 style={styles.cardTitle}>Autonomous Delivery Queue</h2>
            </div>
            <div style={{ padding: '16px', maxHeight: '350px', overflowY: 'auto' }}>
              {userProfile?.orders?.map((order, idx) => (
                <div key={idx} style={styles.orderBox}>
                  <h5 style={{ margin: 0, fontSize: '13px', color: '#fff', fontWeight: '500' }}>{order.name} (x{order.quantity})</h5>
                  <button onClick={() => triggerCancellation(order)} style={styles.btnCancel}>Cancel Dispatch</button>
                </div>
              ))}
              {(!userProfile?.orders || userProfile.orders.length === 0) && (
                <p style={{ margin: 0, padding: '12px 0', fontSize: '12px', color: '#8b949e', textAlign: 'center' }}>No active deliveries</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {showGiftModal && (
        <div style={styles.modalOverlay} onClick={() => setShowGiftModal(false)}>
          <div style={{
            ...styles.modalContent,
            height: 'auto',
            maxHeight: '420px',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#171b22',
            gap: '16px',
            padding: '40px 24px'
          }} onClick={(e) => e.stopPropagation()}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '8px' }}>⚡</span>
            <h2 style={{ margin: 0, color: '#fff', fontWeight: '600', fontSize: '22px' }}>Welcome Grant Initiated</h2>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '14px', lineHeight: '1.6', maxWidth: '360px' }}>
              Allocated <strong style={{ color: '#58a6ff' }}>Rs 1,000</strong> to your credentials. Use the conversational terminal to transact.
            </p>
            <button 
              onClick={() => {
                setShowGiftModal(false);
                setIsModalOpen(true);
              }}
              style={{
                ...styles.btnAdd,
                padding: '12px 28px',
                borderRadius: '30px',
                fontSize: '14px',
                marginTop: '16px',
                background: 'linear-gradient(135deg, #7a22ff 0%, #00d2ff 100%)'
              }}
            >
              Open AI Chat Interface
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #21262d', paddingBottom: '16px', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '18px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  OmniMind Assistant
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button 
                  onClick={() => setShowAgentGuide(!showAgentGuide)} 
                  style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '14px' }}
                >
                  {showAgentGuide ? 'Hide Prompts' : 'Show Prompts'}
                </button>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '18px' }}>✕</button>
              </div>
            </div>
            
            {showAgentGuide && (
              <div style={styles.guideContainer} className="gemini-guide-grid">
                {agentGuideExamples.map((item, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleExampleClick(item.example)}
                    className="guide-card-hover"
                    style={styles.guideItem}
                  >
                    <div style={styles.guideExample}>{item.example}</div>
                    <div style={styles.guideDescription}>{item.description}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.chatLogsArea}>
              {chatHistory.map((msg, i) => (
                <div 
                  key={i} 
                  className={msg.sender === 'agent' ? 'agent-avatar-decor' : ''}
                  style={msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAgent}
                >
                  {msg.text}
                </div>
              ))}
              
              {isAgentTyping && (
                <div className="agent-avatar-decor" style={styles.bubbleAgent}>
                  <div className="gemini-loader">
                    <div className="gemini-loader-dot"></div>
                    <div className="gemini-loader-dot"></div>
                    <div className="gemini-loader-dot"></div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {pendingApproval && (
              <div style={styles.hitlContainer}>
                <p style={{ margin: 0, color: '#f0f6fc', fontSize: '13px' }}>
                  Confirm operational execution sequence: <strong>{pendingApproval.type.toUpperCase()}</strong>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => resolveHumanApproval('approve')} style={{...styles.btnPrimary, padding: '8px 16px', borderRadius: '20px'}}>Approve</button>
                  <button onClick={() => resolveHumanApproval('reject')} style={{...styles.btnSecondary, padding: '8px 16px', borderRadius: '20px'}}>Reject</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="gemini-input-wrapper" style={styles.chatForm}>
              <input 
                type="text" 
                placeholder={pendingApproval ? "Pending authorization requirement..." : isAgentTyping ? "Assistant is thinking..." : "Ask OmniMind..."} 
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
                style={styles.modalInput}
                disabled={!!pendingApproval || isAgentTyping}
                autoFocus
              />
              <button type="submit" style={styles.btnSend} disabled={!!pendingApproval || isAgentTyping}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;