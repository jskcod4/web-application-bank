import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const apiAppInterceptor: HttpInterceptorFn = (req, next) => {
  let headers = new HttpHeaders();

  headers = headers.append('authorId', '181920');

  const httpReq = req.clone({
    headers,
  });

  return next(httpReq);
};
