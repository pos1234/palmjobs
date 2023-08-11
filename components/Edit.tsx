import { DraftHandleValue, Editor, EditorState, convertToRaw, getDefaultKeyBinding, RichUtils, ContentState } from 'draft-js';
import React, { useRef, useState } from 'react';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
const MyEditor: React.FC<{ onEditorData: (data: string) => void }> = (props) => {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const editorRef = useRef<Editor>(null);
    const focus = () => {
        editorRef.current?.focus();
    };
    const onChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const rawContentState = newEditorState.getCurrentContent();
        const htmlData = stateToHTML(rawContentState);
        props.onEditorData(htmlData);
        /*         console.log(htmlData);
         */
    };
    const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const mapKeyToEditorCommand = (e: React.KeyboardEvent): string => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return '';
        }
        const keyBinding = getDefaultKeyBinding(e);
        return keyBinding || '';
    };
    const toggleBlockType = (blockType: string) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };
    const toggleInlineStyle = (inlineStyle: string) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    const styleMap: Record<string, React.CSSProperties> = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2
        }
    };
    const getBlockStyle = (block: any): string => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return '';
        }
    };
    interface StyleButtonProps {
        onToggle: (style: string) => void;
        label: string;
        active: boolean;
        style: string;
    }
    const StyleButton: React.FC<StyleButtonProps> = (props) => {
        const onToggle = (e: React.MouseEvent) => {
            e.preventDefault();
            props.onToggle(props.style);
        };
        let className = 'RichEditor-styleButton';
        if (props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={onToggle}>
                {props.label}
            </span>
        );
    };
    const BLOCK_TYPES = [
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'H4', style: 'header-four' },
        { label: 'H5', style: 'header-five' },
        { label: 'H6', style: 'header-six' },
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
    ];
    const BlockStyleControls: React.FC<any> = (props) => {
        const { editorState } = props;
        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return (
            <div className="RichEditor-controls">
                {BLOCK_TYPES.map((type) => (
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };
    const INLINE_STYLES = [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ];
    const InlineStyleControls: React.FC<any> = (props) => {
        const currentStyle = props.editorState.getCurrentInlineStyle();
        return (
            <div className="RichEditor-controls">
                {INLINE_STYLES.map((type) => (
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };
    return (
        <div className="RichEditor-root">
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
            <div className={className} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    placeholder="Description..."
                    ref={editorRef}
                    spellCheck={true}
                />
            </div>
        </div>
    );
};
export const EditContent: React.FC<{ existingData: string; onEditorData: (data: string) => void }> = (props) => {
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(stateFromHTML('hey')));
    const editorRef = useRef<Editor>(null);
    const focus = () => {
        editorRef.current?.focus();
    };
    const onChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
        const rawContentState = newEditorState.getCurrentContent();
        const htmlData = stateToHTML(rawContentState);
        props.onEditorData(htmlData);
        console.log(htmlData);
    };
    const handleKeyCommand = (command: string, editorState: EditorState, eventTimeStamp: number): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };
    const mapKeyToEditorCommand = (e: React.KeyboardEvent): string => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return '';
        }
        const keyBinding = getDefaultKeyBinding(e);
        return keyBinding || '';
    };
    const toggleBlockType = (blockType: string) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };
    const toggleInlineStyle = (inlineStyle: string) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    const styleMap: Record<string, React.CSSProperties> = {
        CODE: {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
            fontSize: 16,
            padding: 2
        }
    };
    const getBlockStyle = (block: any): string => {
        switch (block.getType()) {
            case 'blockquote':
                return 'RichEditor-blockquote';
            default:
                return '';
        }
    };
    interface StyleButtonProps {
        onToggle: (style: string) => void;
        label: string;
        active: boolean;
        style: string;
    }
    const StyleButton: React.FC<StyleButtonProps> = (props) => {
        const onToggle = (e: React.MouseEvent) => {
            e.preventDefault();
            props.onToggle(props.style);
        };
        let className = 'RichEditor-styleButton';
        if (props.active) {
            className += ' RichEditor-activeButton';
        }
        return (
            <span className={className} onMouseDown={onToggle}>
                {props.label}
            </span>
        );
    };
    const BLOCK_TYPES = [
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
        { label: 'H4', style: 'header-four' },
        { label: 'H5', style: 'header-five' },
        { label: 'H6', style: 'header-six' },
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' }
    ];
    const BlockStyleControls: React.FC<any> = (props) => {
        const { editorState } = props;
        const selection = editorState.getSelection();
        const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return (
            <div className="RichEditor-controls">
                {BLOCK_TYPES.map((type) => (
                    <StyleButton
                        key={type.label}
                        active={type.style === blockType}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };
    const INLINE_STYLES = [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ];
    const InlineStyleControls: React.FC<any> = (props) => {
        const currentStyle = props.editorState.getCurrentInlineStyle();
        return (
            <div className="RichEditor-controls">
                {INLINE_STYLES.map((type) => (
                    <StyleButton
                        key={type.label}
                        active={currentStyle.has(type.style)}
                        label={type.label}
                        onToggle={props.onToggle}
                        style={type.style}
                    />
                ))}
            </div>
        );
    };
    return (
        <div className="RichEditor-root">
            <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
            <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
            <div className={className} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    
                    placeholder="Description..."
                    ref={editorRef}
                    spellCheck={true}
                />
            </div>
        </div>
    );
};
export default MyEditor;
