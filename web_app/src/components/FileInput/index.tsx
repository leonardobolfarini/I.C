import { Export } from '@phosphor-icons/react/dist/ssr'
import { FileInputContent, FileInputLabel, FileInputStyle } from './styles'
import React, { forwardRef, useRef, useState } from 'react'
import { colors } from '@/src/styles/colors'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  idhtml: string
  database: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(props: FileInputProps, ref) {
    const { idhtml, database } = props

    const [filename, setFilename] = useState<string | null>(null)
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0]
      if (file) {
        setFilename(file.name)
      }
    }

    function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
      event.preventDefault()
      setDragOver(false)

      const file = event.dataTransfer.files?.[0]
      if (file && inputRef.current) {
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file)
        inputRef.current.files = dataTransfer.files
        setFilename(file.name)

        const changeEvent = new Event('change', { bubbles: true })
        inputRef.current.dispatchEvent(changeEvent)
      }
    }

    return (
      <FileInputLabel
        htmlFor={idhtml}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #21A485' : '2px dashed #ccc',
          backgroundColor: dragOver ? '#f0fdf9' : '#fff',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <FileInputContent>
          {filename || (
            <div>
              <Export
                width={62}
                height={62}
                weight="bold"
                color={colors.slate500}
              />
              <p>Arraste e solte o arquivo do {database} aqui</p>
              <span>ou clique para selecionar</span>
            </div>
          )}
        </FileInputContent>
        <FileInputStyle
          id={idhtml}
          type="file"
          accept={props.accept}
          onChange={handleChange}
          ref={(el) => {
            inputRef.current = el
            if (typeof ref === 'function') ref(el)
            else if (ref) ref.current = el
          }}
          {...props}
        />
      </FileInputLabel>
    )
  },
)
