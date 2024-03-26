"use strict";const fs=require("hexo-fs"),UglifyJS=require("uglify-js"),lazyLoadPath="./simple-lazyload.js",thirdPartyFixPath="./third-party-fix.js";hexo.extend.filter.register("after_render:html",function(n){let s="./default-image.json",r=this.config.lazyload.loadingImg;return r||(r=JSON.parse(fs.readFileSync(s)).default),n.replace(/<img(.*?)src="(.*?)"(.*?)>/gi,function(e,a,t){return/data-original/gi.test(e)||/src="data:image(.*?)/gi.test(e)||/no-lazy/gi.test(e)?e:e.replace(t,r+'" data-original="'+t)})}),hexo.extend.filter.register("after_render:html",function(i){let n=function(){return`<script>
            window.imageLazyLoadSetting = {
                isSPA: ${!!this.config.lazyload.isSPA},
                processImages: null,
            };
        <\/script>`},s=function(e){if(!fs.exists(e))throw new TypeError(e+" not found!");let a=fs.readFileSync(e,{escape:!0});return"<script>"+UglifyJS.minify(a).code+"<\/script>"},r=function(e,a){let t=a.lastIndexOf("</body>");return a.substring(0,t)+e+a.substring(t,a.length)};return/<\/body>/gi.test(i)&&(i=r(n.bind(this)(),i),i=r(s(thirdPartyFixPath),i),i=r(s(lazyLoadPath),i)),i});
