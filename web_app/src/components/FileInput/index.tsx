import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { FileInputLabel, FileInputStyle } from './styles'
import React, { forwardRef, useState } from 'react'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  idhtml: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(props: FileInputProps, ref) {
    const { idhtml } = props

    const [filename, setFilename] = useState<string | null>(null)

    function handleFileChangeName(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0]
      if (file) {
        setFilename(file.name)
      }
    }

    return (
      <>
        <FileInputLabel htmlFor={idhtml}>
          <div>
            <MagnifyingGlass width={20} height={20} weight="bold" />
          </div>
          {filename || 'Procurar arquivo'}
        </FileInputLabel>
        <FileInputStyle
          id={idhtml}
          type="file"
          onChangeCapture={handleFileChangeName}
          {...props}
          ref={ref}
        />
      </>
    )
  },
)
