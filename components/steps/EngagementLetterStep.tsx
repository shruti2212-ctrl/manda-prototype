'use client';

import { ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import BackButton from '@/components/BackButton';

interface Props {
  selectedCompany: string;
  pscName: string;
  onSign: () => void;
  onBack: () => void;
  progress: ReactNode;
}

export default function EngagementLetterStep({ selectedCompany, pscName, onSign, onBack, progress }: Props) {
  const [signStyle, setSignStyle] = useState<'type' | 'draw'>('type');
  const [typedName, setTypedName] = useState(pscName);
  const [signed, setSigned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const initCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    c.width = c.offsetWidth * 2;
    c.height = 160;
    c.style.height = '80px';
    ctx.scale(2, 2);
    ctx.strokeStyle = '#08172B';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = c.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    c.onmousedown = c.ontouchstart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawingRef.current = true;
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    c.onmousemove = c.ontouchmove = (e: MouseEvent | TouchEvent) => {
      if (!drawingRef.current) return;
      e.preventDefault();
      const p = getPos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    c.onmouseup = c.ontouchend = c.onmouseleave = () => { drawingRef.current = false; };
  }, []);

  useEffect(() => {
    if (signStyle === 'draw') initCanvas();
  }, [signStyle, initCanvas]);

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, c.width, c.height);
  };

  const handleSign = () => {
    setSigned(true);
    setTimeout(onSign, 1500);
  };

  return (
    <div className="step active">
      {progress}
      <BackButton onClick={onBack} />

      <div style={{ marginTop: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary-10)', lineHeight: '42px' }}>Your engagement agreement</h1>
        <p style={{ fontSize: 20, fontWeight: 300, color: 'var(--primary-10)', lineHeight: '28px', marginTop: 16 }}>Please read the agreement below and sign using the button.</p>
      </div>

      {/* Agreement document */}
      <div style={{ marginTop: 16, border: '1px solid var(--secondary-90)', borderRadius: 8, padding: '32px 28px', background: 'white', fontSize: 13, lineHeight: 1.8, color: '#1f2937', maxHeight: 400, overflowY: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: '#6b7280', marginBottom: 6, textTransform: 'uppercase' }}>MANDA BY IWOCA</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-10)' }}>COMPANY ENGAGEMENT AGREEMENT</div>
        </div>
        <p>This agreement (the &ldquo;Agreement&rdquo;) begins on the date both parties sign below.</p>
        <p>It is between:</p>
        <p><strong>IWOCA LTD</strong> (company number: 07798925) whose registered office is 10 Queen Street Place, London EC4R 1AG.</p>
        <p>and</p>
        <p><strong>{selectedCompany}</strong> (company number: 12345678) whose registered office is 10 Queen Street Place, London, EC4R 1AG.</p>
        <p>This Agreement sets out the terms on which manda by iwoca (&ldquo;Manda&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) will provide M&amp;A facilitation services to you (&ldquo;Company&rdquo;, &ldquo;you&rdquo;) in connection with a potential acquisition transaction.</p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-10)', margin: '16px 0 6px' }}>1. SERVICES</h3>
        <p>The manda platform uses data you provide to identify and introduce qualified buyers from Manda&apos;s network who may be interested in acquiring a business with your characteristics.</p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-10)', margin: '16px 0 6px' }}>2. COMPANY RESPONSIBILITIES</h3>
        <p>You agree to provide information about the Company that is accurate and not misleading to the best of your knowledge; inform us promptly of any material changes to information provided; and make yourself or relevant decision-makers reasonably available to support the transaction process.</p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-10)', margin: '16px 0 6px' }}>3. FEES</h3>
        <p><strong>3.1 Success Fee Structure</strong></p>
        <p>If a transaction completes, you agree to pay Manda a success fee calculated on a cumulative tiered basis: 5.0% on the first &pound;1M; 4.0% between &pound;1M and &pound;2M; 3.0% between &pound;2M and &pound;3M; 2.0% between &pound;3M and &pound;4M; 1.0% between &pound;4M and &pound;5M; 0.5% above &pound;5M.</p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-10)', margin: '16px 0 6px' }}>4. ANTI-CIRCUMVENTION</h3>
        <p>If you complete a transaction with any buyer introduced by Manda, you will pay Manda the success fee. The exclusivity period applies for 18 months from the date of introduction.</p>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-10)', margin: '16px 0 6px' }}>5-12. ADDITIONAL TERMS</h3>
        <p>Including confidentiality, data protection, term and termination, liability, dispute resolution, relevant regulations, miscellaneous, and declaration of authority clauses. Full terms available on request.</p>
      </div>

      {/* Signed banner */}
      {signed && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#ecfdf5', border: '1px solid #059669', borderRadius: 8, padding: '16px 20px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#059669" /><polyline points="6 10 9 13 14 7" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary-10)', margin: 0 }}>This document has been signed.</p>
          </div>
        </div>
      )}

      {/* Valuation hint */}
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--secondary-97)', border: '1px solid var(--secondary-90)', borderRadius: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--primary-10)' }}>Sign to unlock your valuation estimate</span>
      </div>

      {/* Sign area */}
      {!signed && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--structure-40)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Sign here</div>

          <div style={{ display: 'flex', gap: 0, marginBottom: 12, border: '1px solid var(--secondary-90)', borderRadius: 8, overflow: 'hidden' }}>
            <button onClick={() => setSignStyle('type')} style={{ flex: 1, padding: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: signStyle === 'type' ? 'var(--primary-10)' : 'white', color: signStyle === 'type' ? 'white' : 'var(--primary-10)' }}>Type name</button>
            <button onClick={() => setSignStyle('draw')} style={{ flex: 1, padding: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'inherit', background: signStyle === 'draw' ? 'var(--primary-10)' : 'white', color: signStyle === 'draw' ? 'white' : 'var(--primary-10)' }}>Draw</button>
          </div>

          <div style={{ border: '2px dashed var(--secondary-90)', borderRadius: 8, padding: 24, background: 'var(--secondary-97)' }}>
            {signStyle === 'type' ? (
              <div style={{ borderBottom: '1px solid var(--structure-80)', paddingBottom: 8, minHeight: 40, display: 'flex', alignItems: 'flex-end' }}>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Type your full name"
                  style={{ fontFamily: "'Aesop', serif", fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: 'var(--primary-10)', border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
                />
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <canvas ref={canvasRef} style={{ width: '100%', height: 80, borderBottom: '1px solid var(--structure-80)', cursor: 'crosshair', touchAction: 'none' }} />
                <button onClick={clearCanvas} style={{ position: 'absolute', top: 4, right: 4, background: 'none', border: 'none', fontSize: 11, color: 'var(--secondary-40)', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--secondary-40)', marginTop: 8 }}>
              <span>{pscName}</span>
              <span>{today}</span>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <button onClick={handleSign} style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'linear-gradient(180deg, #205eac 0%, #1b4e8d 100%)', color: 'white', border: 'none', borderRadius: 8, padding: '14px 24px', fontSize: 16, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Adopt signature and sign
            </button>
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--secondary-40)' }}>
            By clicking &ldquo;Adopt signature and sign&rdquo;, you agree to be bound by the terms of this engagement agreement and confirm you have read the <a href="#" style={{ color: 'var(--primary-40)' }}>Privacy Policy</a>.
          </div>
        </div>
      )}
    </div>
  );
}
