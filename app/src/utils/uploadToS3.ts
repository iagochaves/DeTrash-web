export function uploadToS3(url: string, file: File) {
  fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Length': String(file.size),
    },
  });
}
