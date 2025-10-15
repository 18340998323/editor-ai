import React from 'react';
import ImageUploader from '@/components/ImageUploader';

/**
 * 图片上传功能测试页面
 * 这个页面用于测试和演示图片上传功能
 */
export default function UploadTest() {
  const handleUploadSuccess = (results: any[]) => {
    console.log('上传成功:', results);
  };

  const handleUploadError = (error: Error) => {
    console.error('上传失败:', error);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">图片上传功能测试</h1>
      
      <div className="space-y-12">
        {/* 单文件上传测试 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">单文件上传</h2>
          <ImageUploader
            multiple={false}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </section>

        {/* 多文件上传测试 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">多文件上传（最多3个）</h2>
          <ImageUploader
            multiple={true}
            maxFiles={3}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
          />
        </section>
      </div>

      <div className="mt-12 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">使用说明</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• 支持拖拽图片到上传区域</li>
          <li>• 点击"选择图片"按钮选择文件</li>
          <li>• 支持 JPG、PNG、GIF、WebP 格式</li>
          <li>• 单个文件最大 5MB</li>
          <li>• 上传成功后可以预览和删除图片</li>
        </ul>
      </div>
    </div>
  );
}

