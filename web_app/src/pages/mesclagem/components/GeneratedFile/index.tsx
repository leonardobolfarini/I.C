import { Download, FileCsv, FileTxt } from '@phosphor-icons/react/dist/ssr'
import { GeneratedFileContainer } from './styles'
import { Button } from '@/src/components/Button'
import { colors } from '@/src/styles/colors'

interface GeneratedFileProps {
  fileType: 'csv' | 'txt'
  downloadUrl: string
  fileName: string
}

export function GeneratedFile({
  fileType = 'txt',
  downloadUrl,
  fileName,
}: GeneratedFileProps) {
  return (
    <GeneratedFileContainer>
      <div>
        {fileType === 'csv' ? (
          <FileCsv size={28} color={colors.green500} />
        ) : (
          <FileTxt size={28} color={colors.blue500} />
        )}
        <div>
          <p>{fileName}</p>
          <span>Base unificada de registros</span>
        </div>
      </div>
      <a href={downloadUrl} download={fileName}>
        <Button colorButton="transparent" size="small">
          <Download size={24} />
          Download
        </Button>
      </a>
    </GeneratedFileContainer>
  )
}
