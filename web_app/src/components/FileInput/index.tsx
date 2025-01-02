import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { FileInputLabel, FileInputStyle } from './styles'
import React, { forwardRef } from 'react'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  idhtml: string
  filename: string | null
}

export const FileInput = forwardRef(function FileInput(
  props: FileInputProps,
  ref,
) {
  const { filename, idhtml } = props
  return (
    <div>
      <FileInputLabel htmlFor={idhtml}>
        <div>
          <MagnifyingGlass width={20} height={20} weight="bold" />
        </div>
        {filename || 'Procurar arquivo'}
      </FileInputLabel>
      <FileInputStyle id={idhtml} type="file" {...props} ref={ref} />
    </div>
  )
})
