import React from 'react';
import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from 'react-filerobot-image-editor';

export interface ImageEditorProps {
    imageUrl: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (editedImageUrl: string, editedImageFile: File) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
    imageUrl,
    isOpen,
    onClose,
    onSave,
}) => {
    if (!isOpen || !imageUrl) return null;

    const handleSave = (editedImageObject: any) => {
        const { imageBase64, fullName } = editedImageObject;

        const base64Response = fetch(imageBase64);
        base64Response.then(res => res.blob()).then(blob => {
            const file = new File([blob], fullName, { type: blob.type });

            onSave(imageBase64, file);
            onClose();
        });
    };

    return (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="flex h-full w-full items-center justify-center p-4">
                    <FilerobotImageEditor
                        source={imageUrl}
                        onSave={(editedImageObject) => handleSave(editedImageObject)}
                        onClose={onClose}
                        tabsIds={[
                            TABS.ADJUST,
                            TABS.FILTERS
                        ]}
                        defaultTabId={TABS.ADJUST}
                        // Crop options with common aspect ratios
                        Crop={{
                            presetsItems: [
                                {
                                    titleKey: 'custom',
                                    descriptionKey: 'Custom',
                                    ratio: null,
                                },
                                {
                                    titleKey: 'square',
                                    descriptionKey: '1:1',
                                    ratio: 1,
                                },
                                {
                                    titleKey: 'landscape',
                                    descriptionKey: '16:9',
                                    ratio: 16 / 9,
                                },
                                {
                                    titleKey: 'portrait',
                                    descriptionKey: '9:16',
                                    ratio: 9 / 16,
                                },
                                {
                                    titleKey: 'standard',
                                    descriptionKey: '4:3',
                                    ratio: 4 / 3,
                                },
                            ],
                            tools: [TOOLS.CROP],
                        }}
                        Rotate={{ angle: 90, componentType: 'slider' }}
                        Text={{ text: 'Add text here...' }}
                        // Common styling for annotations
                        annotationsCommon={{
                            fill: '#ff0000',
                        }}
                        // Additional config
                        config={{
                            language: 'en',
                            theme: {
                                palette: {
                                    'bg-primary': '#ffffff',
                                    'bg-secondary': '#f5f5f5',
                                    'accent-primary': '#3f51b5',
                                },
                            },
                            tools: {
                                flip: { vertical: true, horizontal: true },
                                crop: true,
                                rotate: true,
                                zoom: true,
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};