import { IconProps } from '@phosphor-icons/react'
import {
  CardDescription,
  CardDetails,
  CardHeader,
  CardTitle,
  TopicCardContainer,
} from './styles'

type IconColors = 'blue' | 'green' | 'purple'

interface TopicCardProps {
  title: string
  details: string
  description: string
  icon: React.ComponentType<IconProps>
  category: string
  iconColor?: IconColors
  onClick?: () => void
}

export function TopicCard({
  category,
  title,
  details,
  description,
  icon: Icon,
  iconColor = 'blue',
  onClick,
}: TopicCardProps) {
  return (
    <TopicCardContainer onClick={onClick}>
      <CardHeader>
        <Icon size={32} color={iconColor} />
        <span>{category}</span>
      </CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDetails>{details}</CardDetails>
      <CardDescription>{description}</CardDescription>
    </TopicCardContainer>
  )
}
