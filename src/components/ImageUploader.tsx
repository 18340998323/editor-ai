import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { uploadImage, uploadMultipleImages, validateFile } from '@/utils/upload';
import { toast } from 'sonner';

interface ImageUploaderProps {
  /** 是否支持多文件上传 */
  multiple?: boolean;
  /** 最大文件数量 */
  maxFiles?: number;
  /** 上传成功回调 */
  onUploadSuccess?: (results: any[]) => void;
  /** 上传失败回调 */
  onUploadError?: (error: Error) => void;
  /** 自定义样式类名 */
  className?: string;
}

export default function ImageUploader({
  multiple = false,
  maxFiles = 5,
  onUploadSuccess,
  onUploadError,
  className = ''
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件上传
  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    if (fileArray.length === 0) return;

    // 检查文件数量限制
    if (fileArray.length > maxFiles) {
      const errorMsg = `最多只能上传 ${maxFiles} 个文件`;
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    // 验证所有文件
    for (const file of fileArray) {
      const validation = validateFile(file);
      if (!validation.valid) {
        setError(validation.error || '文件验证失败');
        toast.error(validation.error || '文件验证失败');
        return;
      }
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      let results;
      if (multiple) {
        results = await uploadMultipleImages(fileArray, {
          onProgress: (progress) => {
            setUploadProgress(progress);
          }
        });
      } else {
        const result = await uploadImage(fileArray[0], {
          onProgress: (progress) => {
            setUploadProgress(progress);
          }
        });
        results = [result];
      }

      const newUrls = results.map(r => r.url);
      setUploadedImages(prev => [...prev, ...newUrls]);
      
      if (onUploadSuccess) {
        onUploadSuccess(results);
      }
      
      toast.success(`成功上传 ${results.length} 个文件`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '上传失败';
      setError(errorMessage);
      toast.error(errorMessage);
      
      if (onUploadError) {
        onUploadError(new Error(errorMessage));
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [multiple, maxFiles, onUploadSuccess, onUploadError]);

  // 点击上传
  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleFileUpload(files);
    }
    // 清空 input 值
    event.target.value = '';
  };

  // 拖拽事件处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  // 删除图片
  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 上传区域 */}
      <div 
        className={`border-dashed border-2 rounded-lg p-6 transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : error 
              ? 'border-red-300 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {error && (
          <div className="flex items-center gap-2 text-red-600 mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {isUploading ? (
          <div className="text-center">
            <Upload className="w-8 h-8 text-blue-500 animate-pulse mx-auto mb-2" />
            <span className="text-blue-600">上传中... {uploadProgress}%</span>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 mx-auto mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 mb-2">
              拖拽图片到此处上传
            </p>
            <p className="text-xs text-gray-400 mb-4">
              支持 JPG、PNG、GIF、WebP 格式，最大 5MB
              {multiple && `，最多 ${maxFiles} 个文件`}
            </p>
            <Button 
              onClick={handleClickUpload}
              disabled={isUploading}
              className="w-fit"
            >
              <Upload className="w-4 h-4 mr-2" />
              选择图片
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 已上传的图片预览 */}
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedImages.map((url, index) => (
            <div key={index} className="relative group">
              <img 
                src={url} 
                alt={`上传的图片 ${index + 1}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

