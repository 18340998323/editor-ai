/**
 * 图片上传工具函数
 */

export interface UploadOptions {
  /** 上传的服务器地址 */
  url?: string;
  /** 最大文件大小（字节） */
  maxSize?: number;
  /** 允许的文件类型 */
  allowedTypes?: string[];
  /** 上传进度回调 */
  onProgress?: (progress: number) => void;
  /** 上传成功回调 */
  onSuccess?: (result: any) => void;
  /** 上传失败回调 */
  onError?: (error: Error) => void;
}

export interface UploadResult {
  url: string;
  name: string;
  size: number;
}

/**
 * 验证文件类型和大小
 */
export function validateFile(file: File, options: UploadOptions = {}): { valid: boolean; error?: string } {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } = options;

  // 检查文件类型
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `不支持的文件类型，请上传 ${allowedTypes.map(type => type.split('/')[1]).join('、')} 格式的图片`
    };
  }

  // 检查文件大小
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `文件大小不能超过 ${maxSizeMB}MB`
    };
  }

  return { valid: true };
}

/**
 * 将文件转换为 base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error('文件读取失败'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * 模拟上传到服务器的函数
 * 在实际项目中，这里应该调用真实的上传接口
 */
export function uploadToServer(
  file: File, 
  options: UploadOptions = {}
): Promise<UploadResult> {
  const { onProgress } = options;
  // const { url = '/api/upload' } = options; // 在实际项目中会使用这个 URL

  return new Promise((resolve, reject) => {
    // 模拟上传进度
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // 模拟上传成功
        setTimeout(() => {
          const result: UploadResult = {
            url: URL.createObjectURL(file), // 使用本地 URL 作为示例
            name: file.name,
            size: file.size
          };
          resolve(result);
        }, 200);
      }
      
      if (onProgress) {
        onProgress(Math.round(progress));
      }
    }, 100);

    // 模拟网络错误（5% 的概率）
    if (Math.random() < 0.05) {
      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('网络错误，上传失败'));
      }, 1000);
    }
  });
}

/**
 * 上传图片的主要函数
 */
export async function uploadImage(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  // 验证文件
  const validation = validateFile(file, options);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  try {
    // 上传文件
    const result = await uploadToServer(file, options);
    
    if (options.onSuccess) {
      options.onSuccess(result);
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '上传失败';
    
    if (options.onError) {
      options.onError(new Error(errorMessage));
    }
    
    throw new Error(errorMessage);
  }
}

/**
 * 批量上传图片
 */
export async function uploadMultipleImages(
  files: FileList | File[],
  options: UploadOptions = {}
): Promise<UploadResult[]> {
  const fileArray = Array.from(files);
  const results: UploadResult[] = [];
  const errors: string[] = [];

  for (const file of fileArray) {
    try {
      const result = await uploadImage(file, options);
      results.push(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '上传失败';
      errors.push(`${file.name}: ${errorMessage}`);
    }
  }

  if (errors.length > 0) {
    console.warn('部分文件上传失败:', errors);
  }

  return results;
}
