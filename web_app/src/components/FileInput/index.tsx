import { Export } from '@phosphor-icons/react/dist/ssr'
import { FileInputContent, FileInputLabel, FileInputStyle } from './styles'
import { colors } from '@/src/styles/colors'
import React, {
  forwardRef,
  useRef,
  useState,
  useMemo,
  useImperativeHandle,
} from 'react'

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  idhtml: string
  database?: string
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(props: FileInputProps, ref) {
    const { idhtml, database, value, onChange, ...rest } = props
    const [dragOver, setDragOver] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => inputRef.current!)

    const filename = useMemo(() => {
      if (
        typeof FileList !== 'undefined' &&
        value instanceof FileList &&
        value.length > 0
      ) {
        return value[0].name
      }
      return null
    }, [value])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(event)
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
          <Export
            width={62}
            height={62}
            weight="bold"
            color={colors.slate500}
          />
          {filename ? (
            <>
              <p style={{ fontWeight: 600, color: colors.slate700 }}>
                {filename}
              </p>
              <span
                style={{
                  color: colors.slate500,
                }}
              >
                Arraste e solte outro arquivo ou clique para substituir
              </span>
            </>
          ) : (
            <>
              <p style={{ fontWeight: 500, color: colors.slate600 }}>
                Arraste e solte o arquivo {database} aqui
              </p>
              <span
                style={{
                  color: colors.slate500,
                }}
              >
                ou clique para selecionar
              </span>
            </>
          )}
        </FileInputContent>

        <FileInputStyle
          id={idhtml}
          type="file"
          accept={props.accept}
          onChange={handleChange}
          ref={inputRef}
          {...rest}
        />
      </FileInputLabel>
    )
  },
)
