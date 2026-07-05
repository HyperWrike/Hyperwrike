'use client';

import { useEffect, useState, useRef } from 'react';

interface DashboardCard {
  id: string;
  title: string;
  subtitle: string;
  value: number;
  target: number;
  unit: string;
  trend: string;
  trendPercent: number;
  color: string;
}

export default function HeroDashboard() {
  const [cards, setCards] = useState<DashboardCard[]>([
    {
      id: 'hours',
      title: 'Hours Recovered',
      subtitle: 'This month',
      value: 0,
      target: 1300,
      unit: 'hrs',
      trend: '+312',
      trendPercent: 34,
      color: '#A9D62B'
    },
    {
      id: 'calls',
      title: 'Calls Handled',
      subtitle: 'Today',
      value: 0,
      target: 500,
      unit: 'calls',
      trend: '0 missed',
      trendPercent: 68,
      color: '#C8EF4A'
    },
    {
      id: 'revenue',
      title: 'Revenue Recovered',
      subtitle: 'This week',
      value: 0,
      target: 50000,
      unit: '$',
      trend: '+$8.2K',
      trendPercent: 42,
      color: '#4dd2ff'
    }
  ]);

  const [activeCard, setActiveCard] = useState<string | null>(null);
  const animationRef = useRef<{[key: string]: number}>({});

  // Animate counter on mount
  useEffect(() => {
    const targetValues = {
      hours: 1240,
      calls: 428,
      revenue: 32400
    };

    cards.forEach((card) => {
      const target = targetValues[card.id as keyof typeof targetValues];
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(target * easeOutQuart);

        setCards(prev => prev.map(c => 
          c.id === card.id ? { ...c, value: currentValue } : c
        ));

        if (progress < 1) {
          animationRef.current[card.id] = requestAnimationFrame(animate);
        }
      };

      animate();
    });

    return () => {
      Object.values(animationRef.current).forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const formatNumber = (num: number, unit: string) => {
    if (unit === '$') {
      if (num >= 1000) {
        return `$${(num / 1000).toFixed(1)}K`;
      }
      return `$${num}`;
    }
    return num.toLocaleString();
  };

  return (
    <div className="dash">
      <div className="dash-grid">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`dcard ${activeCard === card.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveCard(card.id)}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              transform: activeCard === card.id ? 'translateY(-4px)' : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            <div className="dc-head">
              <span className="o">{card.title}</span>
              <span className="m">{card.subtitle}</span>
            </div>
            
            <div className="dc-big">
              <span data-count={card.value}>
                {formatNumber(card.value, card.unit)}
                {card.unit !== '$' && ` ${card.unit}`}
              </span>
              <span className="dc-pill up">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 7-8.5 8.5-5-5L2 17"/>
                  <path d="M16 7h6v6"/>
                </svg>
                {card.trend} ({card.trendPercent}%)
              </span>
            </div>

            <div className="dc-cap">
              {card.id === 'hours' && 'Compared to last month'}
              {card.id === 'calls' && 'After-hours coverage active'}
              {card.id === 'revenue' && 'Recovered from lost leads'}
            </div>

            <div className="dc-target">
              {card.id === 'hours' && 'Month target achieved'}
              {card.id === 'calls' && 'Booked to calendar'}
              {card.id === 'revenue' && 'Pipeline value added'}
            </div>

            <div 
              className="gauge" 
              data-value={card.trendPercent} 
              data-color={card.color}
              style={{
                '--gauge-percent': card.trendPercent,
                '--gauge-color': card.color
              } as React.CSSProperties}
            >
              <svg viewBox="0 0 100 50" style={{ width: '100%', height: 'auto' }}>
                {/* Background arc */}
                <path
                  d="M 10 45 A 40 40 0 0 1 90 45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Foreground arc */}
                <path
                  d="M 10 45 A 40 40 0 0 1 90 45"
                  fill="none"
                  stroke={card.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${(card.trendPercent / 100) * 125.6} 125.6`}
                  style={{
                    transition: 'stroke-dasharray 1s ease-out'
                  }}
                />
                {/* Percentage text */}
                <text
                  x="50"
                  y="38"
                  textAnchor="middle"
                  fill={card.color}
                  fontSize="16"
                  fontWeight="bold"
                >
                  {card.trendPercent}%
                </text>
              </svg>
            </div>

            <div className="toggle">
              <span className={card.id === 'hours' ? 'on' : ''}>
                {card.id === 'hours' && 'Hours saved'}
                {card.id === 'calls' && 'Inbound'}
                {card.id === 'revenue' && 'This week'}
              </span>
              <span>
                {card.id === 'hours' && 'Hours spent'}
                {card.id === 'calls' && 'Outbound'}
                {card.id === 'revenue' && 'This month'}
              </span>
            </div>
          </div>
        ))}

        {/* Configuration Card - Interactive */}
        <div className="dcard config-card">
          <div className="dc-head">
            <span className="o">Reporting Layer</span>
            <span className="m">Configure</span>
          </div>
          <ConfigForm />
        </div>
      </div>
    </div>
  );
}

function ConfigForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    period: 'This month',
    compare: 'Month-to-date (MTD)',
    target: '1,300'
  });

  if (!isOpen) {
    return (
      <button 
        className="config-trigger"
        onClick={() => setIsOpen(true)}
        style={{
          marginTop: '16px',
          width: '100%',
          padding: '12px',
          background: 'rgba(200, 239, 74, 0.1)',
          border: '1px solid rgba(200, 239, 74, 0.3)',
          borderRadius: '8px',
          color: '#C8EF4A',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s ease'
        }}
      >
        Click to configure →
      </button>
    );
  }

  return (
    <div className="fform" style={{ marginTop: '16px' }}>
      <div className="frow">
        <label>Show figures for</label>
        <select 
          className="fctl sel"
          value={config.period}
          onChange={(e) => setConfig({ ...config, period: e.target.value })}
        >
          <option>This month</option>
          <option>Last month</option>
          <option>This quarter</option>
          <option>This year</option>
        </select>
      </div>
      
      <div className="frow">
        <label>Compare period by</label>
        <select 
          className="fctl sel"
          value={config.compare}
          onChange={(e) => setConfig({ ...config, compare: e.target.value })}
        >
          <option>Month-to-date (MTD)</option>
          <option>Week-over-week</option>
          <option>Year-over-year</option>
        </select>
      </div>
      
      <div className="frow">
        <label>Target hours (month)</label>
        <input 
          type="text"
          className="fctl"
          value={config.target}
          onChange={(e) => setConfig({ ...config, target: e.target.value })}
        />
      </div>
      
      <div className="ff-foot">
        <button 
          className="ff-save"
          onClick={() => {
            setIsOpen(false);
            // In real implementation, save to state/API
          }}
        >
          Save
        </button>
        <button 
          className="ff-cancel"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
