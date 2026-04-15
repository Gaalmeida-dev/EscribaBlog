import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const RichTextEditor = () => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Escreva seu conteúdo aqui...</p>"
      onReady={editor => {
        console.log('Editor pronto', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log('Conteúdo do editor:', data);
      }}
      onBlur={(event, editor) => {
        console.log('Editor perdeu foco', editor);
      }}
      onFocus={(event, editor) => {
        console.log('Editor em foco', editor);
      }}
    />
  )
}

export default RichTextEditor