import { Button } from "@/app/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useInteractiveZIndex } from "@/hooks/useInteractiveZIndex"

interface GradientButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function ReadMoreButton({ children, onClick, className = "" }: GradientButtonProps) {
  const zIndexProps = useInteractiveZIndex();
  
  return (
    <div {...zIndexProps.getContainerProps()}>
      <Button
        onClick={onClick}
        style={{
          transform:"skewX(-15deg)"
        }}
        className={`
          bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
          hover:from-yellow-500 hover:via-green-500 hover:to-green-600
          text-black font-semibold
          px-8 py-3 
          rounded-none
          transform 
          transition-all duration-300
          hover:scale-105
          text-3xl p-12 italic cursor-pointer
          shadow-lg hover:shadow-xl
          border-0
          ${className}
        `}
      >
        <span
        style={{
          transform:"skewX(15deg)"
        }}
        className="flex items-center  space-x-2 transform ">
          <span>{children}</span>
          <ChevronRight className="w-10 h-10" />
        </span>
      </Button>
    </div>
  )
}

export function ExploreButton({ children, onClick, className = "" }: GradientButtonProps) {
  const zIndexProps = useInteractiveZIndex();
  
  return (
    <div {...zIndexProps.getContainerProps()}>
      <Button
        onClick={onClick}
        style={{
          transform:"skewX(-15deg)"
        }}
        className={`
          bg-gradient-to-r from-yellow-400 via-green-400 to-green-500
          hover:from-yellow-500 hover:via-green-500 hover:to-green-600
          text-black font-semibold
          px-8 py-3
          rounded-none
          transform
          transition-all duration-300
          hover:scale-105
          text-3xl p-12 italic cursor-pointer
          shadow-lg hover:shadow-xl
          border-0
          ${className}
        `}
      >
        <span
          style={{
          transform:"skewX(15deg)"
        }}
        className="flex  items-center space-x-2 transform">
          <span>{children}</span>
          <ChevronRight className="w-10 h-10" />
        </span>
      </Button>
    </div>
  )
}

// Example usage component
export function HeaderButtons() {
  return (
    <div className="flex space-x-6 ">
      <ReadMoreButton onClick={() => console.log('Read More clicked')}>
        Read More..
      </ReadMoreButton>
      
      <ExploreButton onClick={() => console.log('Explore clicked')}>
        Explore
      </ExploreButton>
    </div>
  )
}