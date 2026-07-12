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
  body: { backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif', minHeight: '100vh', margin: 0, paddingBottom: '40px' },
  nav: { backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 50 },
  navContainer: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '76px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoArea: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '38px', height: '38px', background: 'linear-gradient(135deg, #ff6b00 0%, #ff9e00 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '18px' },
  logoText: { fontWeight: '800', fontSize: '18px', margin: 0 },
  logoSubtext: { margin: 0, fontSize: '11px', color: '#94a3b8' },
  grid: { maxWidth: '1200px', margin: '32px auto 0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' },
  card: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid rgba(226, 232, 240, 0.8)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  cardHeader: { padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { margin: 0, fontSize: '15px', fontWeight: '700' },
  cardSubtitle: { margin: '2px 0 0 0', fontSize: '11px', color: '#94a3b8' },
  cardBody: { padding: '24px' },
  googleBtn: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' },
  profileBadge: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ffeaee', color: '#ff6b00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' },
  balanceBanner: { backgroundColor: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: '14px', padding: '20px', textAlign: 'center', marginBottom: '20px' },
  balanceLabel: { fontSize: '11px', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' },
  balanceValue: { fontSize: '32px', fontWeight: '900', color: '#14532d', margin: '4px 0 0 0' },
  btnPrimary: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', flex: 1 },
  btnSecondary: { backgroundColor: '#fff5f5', color: '#e11d48', border: '1px solid #ffe4e6', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', flex: 1 },
  catalogList: { padding: '0 24px', maxHeight: '580px', overflowY: 'auto' },
  catalogRow: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid #f1f5f9' },
  imgContainer: { width: '72px', height: '72px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  tag: { fontSize: '9px', fontWeight: '700', color: '#ff6b00', backgroundColor: '#fff7ed', padding: '2px 6px', borderRadius: '6px' },
  itemName: { margin: '6px 0 2px 0', fontSize: '14px', fontWeight: '700' },
  itemPrice: { fontSize: '15px', fontWeight: '800' },
  selectQuantity: { padding: '6px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', cursor: 'pointer' },
  btnAdd: { backgroundColor: '#ff6b00', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' },
  orderBox: { padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '14px', marginBottom: '12px' },
  btnCancel: { width: '100%', padding: '6px', backgroundColor: '#fff', color: '#e11d48', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', marginTop: '8px' },
  cancelledBox: { padding: '12px', backgroundColor: '#fdf2f8', border: '1px solid #fce7f3', borderRadius: '14px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#1e293b', padding: '24px', borderRadius: '24px', width: '90%', maxWidth: '480px', height: '80vh', maxHeight: '650px', display: 'flex', flexDirection: 'column' },
  chatLogsArea: { flex: 1, overflowY: 'auto', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' },
  bubbleUser: { alignSelf: 'flex-end', backgroundColor: '#3b82f6', color: '#fff', padding: '10px 14px', borderRadius: '16px 16px 0 16px', fontSize: '13.5px', maxWidth: '80%' },
  bubbleAgent: { alignSelf: 'flex-start', backgroundColor: '#0f172a', color: '#e2e8f0', padding: '10px 14px', borderRadius: '16px 16px 16px 0', fontSize: '13.5px', maxWidth: '80%', border: '1px solid #334155' },
  chatForm: { display: 'flex', gap: '8px' },
  modalInput: { flex: 1, padding: '14px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff', outline: 'none' },
  btnSend: { backgroundColor: '#ff6b00', color: '#fff', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' },
  hitlContainer: { backgroundColor: '#0f172a', border: '1px solid #e11d48', padding: '14px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '4px' }
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
    { sender: 'agent', text: 'Hello! I am your automated FlashCart delivery system agent. How can I assist you today?' }
  ]);
  // Human-in-the-loop hook state
  const [pendingApproval, setPendingApproval] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isModalOpen, pendingApproval]);

  useEffect(() => {
    loadMarketplace();
    const savedUserId = localStorage.getItem("app_user_id");
    if (savedUserId) setActiveUserId(savedUserId);
  }, []);

  useEffect(() => {
    if (activeUserId) fetchUserDetails(activeUserId);
    else setUserProfile(null);
  }, [activeUserId]);

  const loginWithFirebaseGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const generatedId = "user_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("app_user_id", generatedId);
      await registerGoogleUserInBackend(generatedId, user.displayName, user.email);
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
    if (userProfile && userProfile.user_balance < totalPrice) return alert("Insufficient balance to fulfill transaction matrix.");

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

  // =====================================================================
  // AGENT SERVICE ORCHESTRATION PIPELINES WITH INTERCEPTOR FLAGS
  // =====================================================================
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!modalInputValue.trim() || pendingApproval) return;

    const currentUid = localStorage.getItem("app_user_id") || "guest_user_session";
    const userMessage = modalInputValue;

    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setModalInputValue("");

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
        
        // Post-execution evaluation check: Pull pending verification records
        const approvalCheck = await fetch(`${AGENT_GATEWAY_URL}/api/agent/pending-approval/${currentUid}`);
        const approvalData = await approvalCheck.json();
        if (approvalData.has_pending) {
          setPendingApproval(approvalData);
        }
      }
    } catch (error) {
      console.error(error);
      setChatHistory(prev => [...prev, { sender: 'agent', text: "Error connecting to AI execution engine." }]);
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

  return (
    <div style={styles.body}>
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}>⚡</div>
            <div>
              <h1 style={styles.logoText}>FlashCart App</h1>
              <p style={styles.logoSubtext}>Ultra-fast Snack Delivery Engine</p>
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

      <main style={styles.grid}>
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={styles.card}>
            <div style={styles.cardBody}>
              {!activeUserId ? (
                <button onClick={loginWithFirebaseGoogle} style={styles.googleBtn}>Continue with Google Auth</button>
              ) : (
                <div style={styles.profileBadge}>
                  <div style={styles.avatar}>{userProfile?.user_name?.charAt(0) || 'U'}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: '700' }}>{userProfile?.user_name || "Syncing..."}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>{activeUserId}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h2 style={styles.cardTitle}>Wallet Ledger</h2>
                <p style={styles.cardSubtext}>Deposit or deduct store balance</p>
              </div>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.balanceBanner}>
                <span style={styles.balanceLabel}>Available Credits</span>
                <h3 style={styles.balanceValue}>₹{userProfile ? userProfile.user_balance.toFixed(2) : "0.00"}</h3>
              </div>
              <div style={{ width: '100%', marginTop: '12px', borderRadius: '20px', overflow: 'hidden', border: '2px solid #3b82f6' }}>
                <img src={boy} alt="Console Link" onClick={() => setIsModalOpen(true)} style={{ display: 'block', width: '100%', cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.card, gridColumn: 'span 5' }}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>Store Inventory</h2>
              <p style={styles.cardSubtext}>Select quantity and add to cart pipeline</p>
            </div>
          </div>
          <div style={styles.catalogList}>
            {!loadingItems && marketplaceItems.map((item, idx) => (
              <div key={idx} style={styles.catalogRow}>
                <div style={styles.imgContainer}>
                  <img src={item.image_url} alt={item.item_name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={styles.tag}>{item.category}</span>
                  <h4 style={styles.itemName}>{item.item_name}</h4>
                  <div style={styles.itemPrice}>₹{item.price.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <select value={selectedQuantities[item.item_name] || 1} onChange={(e) => handleQuantityChange(item.item_name, e.target.value)} style={styles.selectQuantity}>
                    {[1, 2, 3, 5].map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                  <button onClick={() => buyMarketplaceItem(item.item_name, item.price)} style={styles.btnAdd}>ADD</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 3', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={styles.card}>
            <div style={{...styles.cardHeader, borderLeft: '4px solid #f59e0b'}}>
              <h2 style={styles.cardTitle}>Active Processing</h2>
            </div>
            <div style={{ padding: '16px', maxHeight: '250px', overflowY: 'auto' }}>
              {userProfile?.orders?.map((order, idx) => (
                <div key={idx} style={styles.orderBox}>
                  <h5 style={{ margin: 0, fontSize: '12px' }}>{order.name} (x{order.quantity})</h5>
                  <button onClick={() => triggerCancellation(order)} style={styles.btnCancel}>Cancel Dispatch</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CHAT WINDOW WINDOW */}
      {isModalOpen && (
        <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>AI Assistant Console</h3>
                <p style={{ color: '#94a3b8', fontSize: '11px', margin: '2px 0 0 0' }}>Fulfillment Gateway Module Node</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={styles.chatLogsArea}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAgent}>{msg.text}</div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* HUMAN-IN-THE-LOOP TRANSACTION CONFIRMATION FOOTER OVERLAY */}
            {pendingApproval && (
              <div style={styles.hitlContainer}>
                <p style={{ margin: 0, color: '#f8fafc', fontSize: '13px', fontWeight: '500' }}>
                  ⚠️ Confirm operational intent for action block: <strong>{pendingApproval.type.toUpperCase()}</strong>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => resolveHumanApproval('approve')} style={{...styles.btnPrimary, padding: '8px'}}>Confirm Execution</button>
                  <button onClick={() => resolveHumanApproval('reject')} style={{...styles.btnSecondary, padding: '8px'}}>Abandone Operation</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSendMessage} style={styles.chatForm}>
              <input 
                type="text" 
                placeholder={pendingApproval ? "Action completion mandatory..." : "Ask agent to buy items..."} 
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
                style={styles.modalInput}
                disabled={!!pendingApproval}
                autoFocus
              />
              <button type="submit" style={styles.btnSend} disabled={!!pendingApproval}>Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;