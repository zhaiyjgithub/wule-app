import { NextRequest, NextResponse } from 'next/server';

const BACKEND_BASE_URL = 'http://35.220.240.126:8092';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'GET');
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'PUT');
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(request, params, 'DELETE');
}

async function handleRequest(
  request: NextRequest,
  params: { path: string[] },
  method: string
) {
  try {
    // 构建后端API路径
    const apiPath = params.path.join('/');
    const backendUrl = `${BACKEND_BASE_URL}/${apiPath}`;
    
    // 获取查询参数
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const finalUrl = searchParams ? `${backendUrl}?${searchParams}` : backendUrl;
    
    console.log(`代理请求: ${method} ${finalUrl}`);

    // 准备请求选项
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // 转发原始请求的其他头部（如授权头）
        ...(request.headers.get('authorization') && {
          'authorization': request.headers.get('authorization')!
        }),
      },
      signal: AbortSignal.timeout(300000), // 5分钟超时
    };

    // 如果有请求体，添加到选项中
    if (method !== 'GET' && method !== 'DELETE') {
      try {
        const body = await request.text();
        if (body) {
          requestOptions.body = body;
        }
      } catch (error) {
        console.log('No request body or invalid JSON');
      }
    }

    // 发送请求到后端
    const response = await fetch(finalUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取响应数据
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('代理API错误:', error);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout' }, 
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: error.message }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
} 