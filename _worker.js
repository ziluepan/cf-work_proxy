addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 获取请求路径
  const urlPath = new URL(request.url).pathname;

  // 根据路径选择对应的环境变量
  let targetUrl;
  if (urlPath === '/clash') {
    targetUrl = CLASH;  // 环境变量 CLASH
  } else if (urlPath === '/base64') {
    targetUrl = BASE64;  // 环境变量 BASE64
  } else {
    // 未知路径，返回 404
    return new Response('Not Found', { status: 404 });
  }

  try {
    // 从对应的 URL 获取内容
    const response = await fetch(targetUrl);

    // 检查是否成功获取内容
    if (!response.ok) {
      return new Response('Error: Unable to retrieve the file.', { status: 500 });
    }

    // 返回获取到的内容
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'inline'
      }
    });
  } catch (error) {
    // 处理任何错误
    return new Response('Error: Unable to proxy the request.', { status: 500 });
  }
}
