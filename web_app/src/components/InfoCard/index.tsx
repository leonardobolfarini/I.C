import { IconProps } from '@phosphor-icons/react'
import { InfoCardContainer } from './style'

type IconColor = 'blue' | 'green' | 'purple' | 'orange'

interface InfoCardProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
  iconColor?: IconColor
}

export function InfoCard({
  description,
  icon: Icon,
  title,
  iconColor = 'blue',
}: InfoCardProps) {
  return (
    <InfoCardContainer>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span>
        <Icon size={32} color={iconColor} />
      </span>
    </InfoCardContainer>
  )
}
