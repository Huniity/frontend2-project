'use client'

export interface ButtonProps {
    name?: string;
    leftName?: string;
    rightName?: string;
    color: string;
    width: string;
    height: string;
    textSize: string;
}

const Button = ({ name, color, width, height, textSize }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 text-black font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300">
            {name}
        </button>
    )
}

const SubButton = ({ name, color, width, height, textSize }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 text-black font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300">
            {name}
        </button>
    )
}

const GoldSubButton = ({ name, color, width, height, textSize }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="px-4 py-2 text-black font-bold rounded-xl hover:bg-blue-600 transition-colors duration-300">
            {name}
        </button>
    )
}





export { Button, SubButton, GoldSubButton };