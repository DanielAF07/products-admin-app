import { Icon, useTheme } from "@ui-kitten/components"

interface Props {
  name: string
  color?: string
  white?: boolean
  size?: number
}

const MyIcon = ({name, color, white = false, size = 24}: Props) => {
  
  const theme = useTheme()
  if(white) {
    color = theme['color-info-100']
  } else if(!color) {
    color = theme['text-basic-color']
  } else {
    color = theme[color] ?? theme['text-basic-color']
  }
  
  return (
    <Icon
      name={name}
      fill={color}
      style={{
        width: size,
        height: size
      }}
    />
  )
}


export default MyIcon