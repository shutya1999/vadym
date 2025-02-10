// components/custom-editor.js
'use client' // only in App Router

import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
import {
    ClassicEditor,
    Autoformat,
    Bold,
    Italic,
    Underline,
    BlockQuote,
    Base64UploadAdapter,
    CloudServices,
    CKBox,
    Essentials,
    Heading,
    ImageInsert,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    PictureEditing,
    Indent,
    IndentBlock,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation
} from 'ckeditor5';

const CKBOX_TOKEN_URL = '';
const LICENSE_KEY = 'GPL';


import 'ckeditor5/ckeditor5.css';
import { useState } from 'react';

interface CustomEditorProps {
    editorData: string;
    setEditorData: React.Dispatch<React.SetStateAction<string>>;
}


const CustomEditor: React.FC<CustomEditorProps> = ({ editorData, setEditorData }) => {
    const handleEditorChange = (event: any, editor: any) => {
        const data = editor.getData(); // Отримуємо дані з редактора
        setEditorData(data); // Оновлюємо дані у батьківському компоненті
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            onChange={handleEditorChange}
            config={{
                //licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDAzNTUxOTksImp0aSI6ImYzMzE1MzhlLThhMDItNGRhYS1hYTllLWJiY2VlNzE0ODU1YyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjViZTRjYzdkIn0.Z-IXVDLtUOUI89zpN_gz851qHyrfdkySMrfr62AGgjbejJzF0JjJkTUNjLK0hia0UWjEsk-K2dhz3iGzqqcRDQ', // Or 'GPL'.
                licenseKey: LICENSE_KEY, // Or 'GPL'.
                // plugins: [Essentials, Paragraph, Bold, Italic],
                // toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
                initialData: editorData,


                plugins: [
                    Autoformat,
                    BlockQuote,
                    Bold,
                    CloudServices,
                    Essentials,
                    Heading,
                    Image,
                    ImageInsert,
                    ImageCaption,
                    ImageResize,
                    ImageStyle,
                    ImageToolbar,
                    ImageUpload,
                    Base64UploadAdapter,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    List,
                    MediaEmbed,
                    Mention,
                    Paragraph,
                    PasteFromOffice,
                    PictureEditing,
                    Table,
                    TableColumnResize,
                    TableToolbar,
                    TextTransformation,
                    Underline,

                    // Include CKBox plugin only if the CKBOX_TOKEN_URL is provided.
                    ...(CKBOX_TOKEN_URL ? [
                        CKBox
                    ] : []),
                ],
                toolbar: [
                    'undo',
                    'redo',
                    '|',
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'link',
                    // 'uploadImage',
                    'insertImage',
                    'ckbox',
                    'insertTable',
                    'blockQuote',
                    'mediaEmbed',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent'
                ],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        }
                    ]
                },
                image: {
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            label: 'Default image width',
                            value: null
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50% page width',
                            value: '50'
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75% page width',
                            value: '75'
                        }
                    ],
                    toolbar: [
                        'imageTextAlternative',
                        'toggleImageCaption',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://'
                },
                table: {
                    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                },
            }}
        />
    );
}

export default CustomEditor;
