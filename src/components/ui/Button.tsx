'use client'

interface ButtonProps {
    name: string;
    color: string;
    width: string;
    height: string;
    textSize: string;
}

const Button = ({ name, color, width, height, textSize }: ButtonProps) => {
    return (
        <button style={{ backgroundColor: color, width, height, fontSize: textSize }} className="px-4 py-2 text-white rounded hover:bg-blue-600 transition-colors duration-300">
            {name}
        </button>
    )
}

export default Button;