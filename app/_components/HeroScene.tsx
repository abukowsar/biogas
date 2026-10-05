import Icon from "./Icon";

// হিরোর অ্যানিমেটেড গ্রামীণ দৃশ্য: গোয়াল → মাটির নিচের ডাইজেস্টার → পাইপে গ্যাস → রান্নাঘরের চুলা,
// আর আউটলেটের স্লারি → ধানক্ষেত। সব অ্যানিমেশন CSS-এ, তাই reduced-motion নিয়মে থেমে যায়।
// ডার্ক মোডে একই দৃশ্য রাতের রূপ নেয় (চাঁদ ও তারা)।
export default function HeroScene() {
  return (
    <div className="scene-wrap">
      <div className="scene">
        <svg viewBox="0 0 560 470" role="img" aria-labelledby="sceneTitle sceneDesc">
          <title id="sceneTitle">গ্রামের বাড়িতে বায়োগ্যাস প্ল্যান্ট</title>
          <desc id="sceneDesc">
            গোয়ালের গোবর মাটির নিচের ডাইজেস্টারে যায়, সেখান থেকে পাইপে গ্যাস রান্নাঘরের চুলায় পৌঁছায়, আর অবশিষ্ট স্লারি
            ধানক্ষেতে সার হিসেবে যায়।
          </desc>
          <defs>
            <linearGradient id="hsSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" className="hs-sky-top" />
              <stop offset="1" className="hs-sky-bot" />
            </linearGradient>
            <linearGradient id="hsSoil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" className="hs-soil-top" />
              <stop offset="1" className="hs-soil-bot" />
            </linearGradient>
            <linearGradient id="hsSlurry" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8A6A33" />
              <stop offset="1" stopColor="#4E3E1F" />
            </linearGradient>
            <linearGradient id="hsGas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9BE3FA" stopOpacity=".9" />
              <stop offset="1" stopColor="#2D8FBF" stopOpacity=".55" />
            </linearGradient>
            <radialGradient id="hsSunGlow">
              <stop offset="0" className="hs-glow-in" />
              <stop offset="1" className="hs-glow-out" />
            </radialGradient>
            <radialGradient id="hsFlame" cx="50%" cy="75%" r="60%">
              <stop offset="0" stopColor="#E8F9FF" />
              <stop offset=".5" stopColor="#7FD3F2" />
              <stop offset="1" stopColor="#2D8FBF" stopOpacity=".2" />
            </radialGradient>
            <clipPath id="hsDome">
              <path d="M205 392a78 52 0 0 1 156 0z" />
            </clipPath>
          </defs>

          {/* আকাশ */}
          <rect width="560" height="470" fill="url(#hsSky)" />
          <g className="hs-stars">
            {[[60, 40], [120, 80], [210, 30], [300, 64], [360, 22], [250, 110], [40, 120], [500, 150], [170, 140]].map(
              ([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.8 : 1.2} style={{ animationDelay: `${i * 0.4}s` }} />
              )
            )}
          </g>

          {/* সূর্য / চাঁদ */}
          <g className="hs-sun">
            <circle cx="452" cy="86" r="72" fill="url(#hsSunGlow)" />
            <g className="hs-rays">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={i} x="450" y="28" width="4" height="14" rx="2" transform={`rotate(${i * 30} 452 86)`} />
              ))}
            </g>
            <circle className="hs-sun-disc" cx="452" cy="86" r="30" />
            <circle className="hs-moon-cut" cx="466" cy="76" r="26" />
          </g>

          {/* মেঘ */}
          <g className="hs-cloud c1">
            <path d="M60 92a16 16 0 0 1 28-10 20 20 0 0 1 37 6 13 13 0 0 1 1 26H66a12 12 0 0 1-6-22z" />
          </g>
          <g className="hs-cloud c2">
            <path d="M300 56a12 12 0 0 1 21-7 15 15 0 0 1 28 4 10 10 0 0 1 1 20h-45a9 9 0 0 1-5-17z" />
          </g>

          {/* দূরের গাছপালা */}
          <path className="hs-far" d="M0 232c30-14 52-10 78-18s40-20 70-12 44 18 76 10 52-24 90-16 50 20 86 14 60-18 100-8 46 12 60 10V262H0z" />
          {/* নারকেল গাছ */}
          <g className="hs-palm">
            <path d="M486 250c-2-34 2-62 10-88" fill="none" strokeWidth="5" strokeLinecap="round" />
            <g className="hs-fronds">
              <path d="M496 162c-16-6-32-2-44 8 14-2 28 0 44-8z" />
              <path d="M496 162c-10-14-26-20-42-18 14 6 26 12 42 18z" />
              <path d="M496 162c8-16 24-22 40-20-12 6-26 12-40 20z" />
              <path d="M496 162c16-4 32 2 42 14-14-4-28-6-42-14z" />
              <path d="M496 162c2-16 10-28 22-34-6 12-12 22-22 34z" />
            </g>
          </g>
          <g className="hs-tree">
            <rect x="40" y="206" width="6" height="46" rx="2" />
            <circle cx="43" cy="196" r="22" />
            <circle cx="28" cy="210" r="15" />
            <circle cx="58" cy="210" r="15" />
          </g>

          {/* মাঠ */}
          <path className="hs-field" d="M0 258h560v62H0z" />
          <g className="hs-rows">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <path key={i} d={`M${352 + i * 24} 262 L${330 + i * 30} 320`} />
            ))}
          </g>

          {/* বাড়ি — টিনের চালা */}
          <g className="hs-house">
            <rect className="hs-wall" x="196" y="196" width="120" height="66" rx="3" />
            <path className="hs-roof" d="M182 200 214 158h86l30 42z" />
            <g className="hs-roof-lines">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path key={i} d={`M${200 + i * 15} 160 L${190 + i * 18} 199`} />
              ))}
            </g>
            <rect className="hs-door" x="222" y="220" width="22" height="42" rx="2" />
            <rect className="hs-window" x="262" y="214" width="38" height="26" rx="3" />
            {/* জানালার ভেতরে চুলা ও নীল শিখা */}
            <rect x="270" y="234" width="22" height="4" rx="1.5" fill="#2A3A35" />
            <g className="hs-flame">
              <ellipse cx="281" cy="228" rx="6" ry="8" fill="url(#hsFlame)" />
            </g>
          </g>

          {/* গরু */}
          <g className="hs-cow">
            <ellipse cx="128" cy="266" rx="26" ry="5" className="hs-shadow" />
            <rect x="104" y="232" width="50" height="26" rx="12" className="hs-cow-body" />
            <circle cx="118" cy="242" r="5" className="hs-cow-spot" />
            <circle cx="140" cy="250" r="4" className="hs-cow-spot" />
            <rect x="108" y="254" width="6" height="12" rx="2" className="hs-cow-body" />
            <rect x="142" y="254" width="6" height="12" rx="2" className="hs-cow-body" />
            <g className="hs-cow-head">
              <rect x="146" y="226" width="20" height="22" rx="8" className="hs-cow-body" />
              <rect x="150" y="240" width="16" height="9" rx="4" fill="#E8B9A5" />
              <path d="M148 228c-4-4-4-8-2-10M164 228c4-4 4-8 2-10" fill="none" stroke="#E7D9B8" strokeWidth="3" strokeLinecap="round" />
              <circle cx="154" cy="234" r="1.6" fill="#2A2A2A" />
              <circle cx="161" cy="234" r="1.6" fill="#2A2A2A" />
            </g>
            <path className="hs-tail" d="M104 238c-8 2-10 10-8 18" fill="none" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* মাটির প্রস্থচ্ছেদ */}
          <rect y="318" width="560" height="152" fill="url(#hsSoil)" />
          <path className="hs-grass-edge" d="M0 318h560" />
          <g className="hs-pebbles">
            <circle cx="40" cy="356" r="3" />
            <circle cx="96" cy="430" r="4" />
            <circle cx="470" cy="440" r="3" />
            <circle cx="520" cy="380" r="2.5" />
            <circle cx="160" cy="452" r="2.5" />
          </g>

          {/* ইনলেট */}
          <path className="hs-pit" d="M150 318h34l-8 52h-18z" />
          <path d="M156 346h24l-4 24h-18z" fill="url(#hsSlurry)" />
          <path className="hs-flow" d="M170 368 C176 384 192 392 206 394" />

          {/* ডাইজেস্টার */}
          <path className="hs-digester" d="M205 392a78 52 0 0 1 156 0v26a78 26 0 0 1-156 0z" />
          <path d="M205 392v26a78 26 0 0 0 156 0v-26z" fill="url(#hsSlurry)" />
          <rect x="203" y="352" width="160" height="40" fill="url(#hsGas)" clipPath="url(#hsDome)" />
          <path className="hs-digester-line" d="M205 392a78 52 0 0 1 156 0" />
          <g className="hs-bubbles">
            <circle cx="250" cy="408" r="3" />
            <circle cx="284" cy="414" r="2.4" />
            <circle cx="318" cy="410" r="2.8" />
            <circle cx="266" cy="416" r="2" />
          </g>

          {/* আউটলেট → ক্ষেত */}
          <path className="hs-pit" d="M382 318h40l-6 50h-28z" />
          <path d="M389 344h30l-3 24h-25z" fill="#6B5A2E" />
          <path className="hs-flow" d="M352 404 C368 398 380 384 390 368" />
          <path className="hs-flow slurry" d="M420 330 C446 318 470 314 500 312" />

          {/* গ্যাস পাইপ: ডোম → বাড়ির চুলা */}
          <path className="hs-pipe" d="M283 340V262" />
          <path className="hs-gasline" d="M283 340V262" />
          <circle className="hs-valve" cx="283" cy="318" r="5" />

          {/* ক্ষেতে চারা */}
          <g className="hs-sprouts">
            {[[470, 300], [500, 294], [530, 302], [446, 306]].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <g className="hs-sprout" style={{ animationDelay: `${i * 0.5}s` }}>
                  <path d="M0 10V0" />
                  <path d="M0 3c-6 0-9-4-9-8 5 0 9 3 9 8z" />
                  <path d="M0 1c5 0 8-4 8-8-5 0-8 3-8 8z" />
                </g>
              </g>
            ))}
          </g>

          {/* লেবেল */}
          <g className="hs-labels">
            <text x="167" y="312">গোবর</text>
            <text x="283" y="460">ডাইজেস্টার</text>
            <text x="402" y="312">সার</text>
          </g>
        </svg>
      </div>

      <div className="float-chip chip-gas">
        <span className="fc-dot teal">
          <Icon name="flame" size={18} />
        </span>
        <span>
          <b>~১.৫ ঘনমিটার</b>
          <small>দৈনিক গ্যাস</small>
        </span>
      </div>
      <div className="float-chip chip-save">
        <span className="fc-dot gold">
          <Icon name="wallet" size={18} />
        </span>
        <span>
          <b>~৳২,৩০০</b>
          <small>মাসিক সাশ্রয়</small>
        </span>
      </div>
      <div className="float-chip chip-fert">
        <span className="fc-dot green">
          <Icon name="sprout" size={18} />
        </span>
        <span>
          <b>~৩,৬৫০ কেজি</b>
          <small>বছরে জৈব সার</small>
        </span>
      </div>
      <p className="scene-note">৪টি গরু ও ৫ সদস্যের পরিবার ধরে আনুমানিক হিসাব</p>
    </div>
  );
}
