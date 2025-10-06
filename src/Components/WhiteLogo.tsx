import whitelogo from '../Icons/white-logo.svg'

export interface WhiteLogoProps {
    className?: string;
}

export function Whitelogo({ className }: WhiteLogoProps) {
    return(
        <img src={whitelogo} alt="" className={className} />
    )
}