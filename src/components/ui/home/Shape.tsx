import AirportText from "../cyclingtext/AirportText";

const HomeShape = () => {
  const squareCenter = { x: 500, y: 400 };
  const squareSize = 65;

    const corners = [
    { x: squareCenter.x,               y: squareCenter.y - squareSize }, // top
    { x: squareCenter.x + squareSize,  y: squareCenter.y },              // right
    { x: squareCenter.x,               y: squareCenter.y + squareSize }, // bottom
    { x: squareCenter.x - squareSize,  y: squareCenter.y },              // left
    ];
  

  const leftVertex = corners[3];
  const rightVertex = corners[1];
  const leftLineEnd = { x: leftVertex.x - 250, y: leftVertex.y + 0 };
  const rightLineEnd = { x: rightVertex.x + 250, y: rightVertex.y - 0 };
  const squarePoints = corners.map(c => `${c.x},${c.y}`).join(" ");

  return (
    <div className="flex items-center justify-center w-full h-screen relative">
      <svg width="100%" height="100%" viewBox="150 200 700 450">
        <defs>
          <clipPath id="squareClip">
            <polygon points={squarePoints} />
          </clipPath>
        </defs>

        <image
          href="/mountain1.jpg"
          x={squareCenter.x - squareSize}
          y={squareCenter.y - squareSize}
          width={squareSize * 2}
          height={squareSize * 2}
          clipPath="url(#squareClip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Tilted square outline */}
        <polygon points={squarePoints} fill="none" stroke="white" strokeWidth="2" />

        {/* Left line */}
        <line x1={leftVertex.x} y1={leftVertex.y} x2={leftLineEnd.x} y2={leftLineEnd.y} stroke="white" strokeWidth="2" />

        {/* Right line */}
        <line x1={rightVertex.x} y1={rightVertex.y} x2={rightLineEnd.x} y2={rightLineEnd.y} stroke="white" strokeWidth="2" />

        {/* Text on bottom of right line */}
      </svg>

      {/* Text on top of left line - as h1 */}
      <h1 
        className="absolute text-white text-6xl font-made-outer-alt" 
        style={{ 
            left: `${((leftVertex.x + leftLineEnd.x) / 2 - 115) / 7}%`, 
            top: `${((leftVertex.y + leftLineEnd.y) / 2 - 26 - 200) / 4.5}%`, 
            transform: 'translate(-50%, -50%)' 
        }}
      >
        EXPLORE
    </h1>
    <div 
        className="absolute text-white text-6xl font-made-outer-alt" 
        style={{ 
          left: `${((rightVertex.x + rightLineEnd.x) / 2 - 185) / 7}%`, 
          top: `${((rightVertex.y + rightLineEnd.y) / 2 + 24 - 200) / 4.5}%`, 
          transform: 'translate(-50%, -50%)' 
        }}
      >
        <AirportText words={["LandsCapEs", "CitIEs", "CUltuREs", "With Us", "Any TimE", "AnywHErE"]} />
      </div>
    </div>
  );
}

export default HomeShape;