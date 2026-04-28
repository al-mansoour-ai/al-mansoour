import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import engineData from '../src/data/sovereign_engine.json';

export default function SovereignFinalV2() {
  const [activeTab, setActiveTab] = useState('platform');
  const [currentStep, setCurrentStep] = useState(0); 
  const [selectedPillar, setSelectedPillar] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <div dir="rtl" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", paddingBottom: "110px", fontFamily: "'Cairo', sans-serif" }}>
      <Head>
        <title>منصة المنصور السيادية</title>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet" />
      </Head>
      <style>{`* { font-family: 'Cairo', sans-serif !important; } .card { background:white; padding:25px; border-radius:25px; box-shadow:0 10px 40px rgba(0,0,0,0.05); margin-bottom:20px; border:1px solid #eee; cursor:pointer; text-align:right; width:100%; } .hint { background:#f0fdf4; border-right:5px solid #22c55e; padding:15px; border-radius:12px; margin-bottom:15px; font-size:14px; color:#166534; }`}</style>

      <div className="no-print" style={{ background: "#0a192f", color: "white", padding: "20px", textAlign: "center", borderBottom: "5px solid #d4af37" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 900 }}>🏛️ محرك التقارير السيادية (النسخة الخام)</h2>
      </div>

      <main style={{ maxWidth: "650px", margin: "25px auto", padding: "0 15px" }}>
        {activeTab === 'platform' && (
          <div>
            {currentStep === 0 && (
              <>
                <h3 style={{ fontWeight: 900, marginBottom: "25px" }}>🛡️ اختر الركيزة المنهجية:</h3>
                {engineData?.pillars?.map(p => (
                  <button key={p.id} onClick={() => { setSelectedPillar(p); setCurrentStep(1); }} className="card"><b>{p.name}</b></button>
                ))}
              </>
            )}
            {currentStep === 1 && selectedPillar && (
              <>
                <h3 style={{ color: "#d4af37", fontWeight: 900 }}>{selectedPillar.name}</h3>
                {selectedPillar.tracks?.map(t => (
                  <button key={t.id} onClick={() => { setSelectedTrack(t); setCurrentStep(2); }} className="card"><b>{t.name}</b></button>
                ))}
                <button onClick={() => setCurrentStep(0)} style={{ width: "100%", padding: "15px", borderRadius: "15px", border: "1px solid #ddd" }}>رجوع</button>
              </>
            )}
            {currentStep === 2 && selectedTrack && (
              <>
                <h3 style={{ color: "#0a192f", fontWeight: 900, marginBottom: "30px" }}>{selectedTrack.name}</h3>
                {selectedTrack.questions?.map((q, idx) => (
                  <div key={idx} style={{ marginBottom: "40px" }}>
                    <label style={{ fontWeight: 900, display: "block", marginBottom: "10px" }}>{idx + 1}. {q.q}</label>
                    <div className="hint">💡 مثال استرشادي: {q.example}</div>
                    <textarea rows="5" style={{ width: "100%", padding: "15px", borderRadius: "18px", border: "1px solid #cbd5e1" }} placeholder="أدخل البيانات الميدانية هنا..."></textarea>
                  </div>
                ))}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => setCurrentStep(1)} style={{ flex: 1, padding: "20px", borderRadius: "15px", background: "#eee", border: "none" }}>السابق</button>
                  <button onClick={() => window.print()} style={{ flex: 2, padding: "20px", background: "#d4af37", borderRadius: "15px", border: "none", fontWeight: 900 }}>توليد التقرير النهائي 📄</button>
                </div>
              </>
            )}
          </div>
        )}
        {activeTab === 'pricing' && (
          <div className="card" style={{ textAlign: "center" }}>
            <h3 style={{ fontWeight: 900 }}>💰 باقة الاحتراف (Pro)</h3>
            <div style={{ fontSize: "35px", fontWeight: 900, color: "#d4af37" }}>$29 <small style={{ fontSize: "15px", color: "#666" }}>/ شهر</small></div>
            <ul style={{ textAlign: "right", margin: "20px 0" }}><li>✅ 50 تقرير سيادي</li><li>✅ تحسين بـ AI</li></ul>
            <button style={{ width: "100%", padding: "15px", background: "#0a192f", color: "white", borderRadius: "15px", border: "none" }}>اشترك الآن</button>
          </div>
        )}
      </main>

      <nav className="no-print" style={{ position: "fixed", bottom: 0, width: "100%", height: "90px", background: "white", display: "flex", borderTop: "2px solid #eee", zIndex: 1000 }}>
        <button onClick={() => { setActiveTab('platform'); setCurrentStep(0); }} style={{ flex: 1, border: "none", background: "none", color: activeTab === 'platform' ? "#0a192f" : "#adb5bd" }}>
          <div style={{ fontSize: "25px" }}>🏠</div><div style={{ fontSize: "12px", fontWeight: 900 }}>المنصة</div>
        </button>
        <button onClick={() => setActiveTab('pricing')} style={{ flex: 1, border: "none", background: "none", color: activeTab === 'pricing' ? "#0a192f" : "#adb5bd" }}>
          <div style={{ fontSize: "25px" }}>💳</div><div style={{ fontSize: "12px", fontWeight: 900 }}>الباقات</div>
        </button>
      </nav>
    </div>
  );
}
