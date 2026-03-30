tailwindcss 에러가 계속 발생하는 중. 
```sh
⚠ Warning: Next.js inferred your workspace root, but it may not be correct.
 We detected multiple lockfiles and selected the directory of /Users/seungjun/package-lock.json as the root directory.
 To silence this warning, set `turbopack.root` in your Next.js config, or consider removing one of the lockfiles if it's not needed.
   See https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory for more information.
 Detected additional lockfiles: 
   * /Users/seungjun/Desktop/number/package-lock.json


Error: Can't resolve 'tailwindcss' in '/Users/seungjun/Desktop'
    [at finishWithoutResolve (/Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:587:18)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:679:14]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:89:43]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5] {
  details: "resolve 'tailwindcss' in '/Users/seungjun/Desktop'\n" +
    '  Parsed request is a module\n' +
    '  using description file: /Users/seungjun/package.json (relative path: ./Desktop)\n' +
    '    resolve as module\n' +
    "      /Users/seungjun/Desktop/node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in /Users/seungjun/node_modules\n' +
    '        single file module\n' +
    '          using description file: /Users/seungjun/package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              /Users/seungjun/node_modules/tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              /Users/seungjun/node_modules/tailwindcss.css doesn't exist\n" +
    "        /Users/seungjun/node_modules/tailwindcss doesn't exist\n" +
    "      /Users/node_modules doesn't exist or is not a directory\n" +
    "      /node_modules doesn't exist or is not a directory"
}
Error: Can't resolve 'tailwindcss' in '/Users/seungjun/Desktop'
    [at finishWithoutResolve (/Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:587:18)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:679:14]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:27:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:89:43]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5]
    [at eval (eval at create (/Users/seungjun/Desktop/number/node_modules/tapable/lib/HookCodeFactory.js:31:10), <anonymous>:15:1)]
    [at /Users/seungjun/Desktop/number/node_modules/enhanced-resolve/lib/Resolver.js:740:5] {
  details: "resolve 'tailwindcss' in '/Users/seungjun/Desktop'\n" +
    '  Parsed request is a module\n' +
    '  using description file: /Users/seungjun/package.json (relative path: ./Desktop)\n' +
    '    resolve as module\n' +
    "      /Users/seungjun/Desktop/node_modules doesn't exist or is not a directory\n" +
    '      looking for modules in /Users/seungjun/node_modules\n' +
    '        single file module\n' +
    '          using description file: /Users/seungjun/package.json (relative path: ./node_modules/tailwindcss)\n' +
    '            no extension\n' +
    "              /Users/seungjun/node_modules/tailwindcss doesn't exist\n" +
    '            .css\n' +
    "              /Users/seungjun/node_modules/tailwindcss.css doesn't exist\n" +
    "        /Users/seungjun/node_modules/tailwindcss doesn't exist\n" +
    "      /Users/node_modules doesn't exist or is not a directory\n" +
    "      /node_modules doesn't exist or is not a directory"
}
```
터미널 실행 시, 무한 루프 주의