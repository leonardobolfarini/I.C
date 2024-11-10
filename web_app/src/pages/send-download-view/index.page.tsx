import * as Form from '@radix-ui/react-form'
import {
  FilesContainer,
  FilesToDownload,
  FilesToSend,
  FilesView,
} from './styles'
import { Button } from '../components/Button'
import { PaperPlaneRight } from '@phosphor-icons/react'

export default function SendDownloadView() {
  return (
    <FilesContainer>
      <FilesToSend>
        <Form.Root>
          <Form.Field name="Scopus">
            <Form.Message>Scopus(.csv): </Form.Message>
            <Form.Control type="file" />
          </Form.Field>
          <Form.Field name="WoS">
            <Form.Message>WoS(.txt): </Form.Message>
            <Form.Control type="file" />
          </Form.Field>
          <Form.Submit asChild>
            <Button colorButton={'white'}>
              Enviar
              <PaperPlaneRight weight="bold" height={20} width={20} />
            </Button>
          </Form.Submit>
        </Form.Root>
      </FilesToSend>
      <FilesToDownload></FilesToDownload>
      <FilesView></FilesView>
    </FilesContainer>
  )
}
