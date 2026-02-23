'use client'

export interface ButtonProps {
    children?: React.ReactNode;
    name?: string;
    leftName?: string;
    rightName?: string;
    color: string;
    width: string;
    height: string;
    textSize: string;
    textColor?: string;
}

const Button = ({ name, color, width, height, textSize, textColor, children }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, color: textColor, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300 gap-2">
            {children}
            {name}
        </button>
    )
}

const SubButton = ({ name, color, width, height, textSize, textColor, children }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, color: textColor, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 text-black font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300">
            {children}
            {name}
        </button>
    )
}

const GoldSubButton = ({ name, color, width, height, textSize, textColor, children }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, color: textColor, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 text-black font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300">
            {children}
            {name}
        </button>
    )
}





export { Button, SubButton, GoldSubButton };