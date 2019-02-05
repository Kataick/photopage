/**
 * photo.js v2.1.9
 * @author KkakaMann
 * @mailto KkakaMann24@gmail.com  KkakaMann@163.com
 */
$(function (){
    var root = document.documentElement,timer,$xlphotoli=$('.xl-photo li'),$xlMask,$xlPhotospage,$xlphotospageMain,$xlphotospageImgarea,$xlphotospageState,$xlphotospageImg,$xlphotospageClose,$xlphotospagePrev,$xlphotospageNext,$xlphotospageContent,$xlImgTit,$xlImgleftrotate,$xlImgrerotate,$xlImgoriginal,$xlphotospageTimestamp,$xlphotospageList,$xlphotospageListprve,$xlphotospageListli,$xlphototitle,$xlphotouser,xlphotolength,xlimgwidth,xlimgoriginalwidth,xlimgheight,xlimgareawidth,xlimgareaheight,xlimgoriginalheight,xlimgindex,xlrotater,xllistpage,xllistmaxpage,xllistnum,xldirectionnum,xllistcontent='',isfirst=true,ismove=iszoom=isrotate=false,xlphoto=[],xltoolbar='',xlhandletab='',xlicon=[],xlicontitle=[];
    var $xlphotospageshowimglist;
    $('.xl-backtotop').css('margin-left','720px');
    var getreqfullscreen=function (){
        return root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen || root.msRequestFullscreen;
    };
    var getfullscreenelement=function (){
        return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    };
    var getexitfullscreen=function (){
        return document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    };
    $xlphotoli.each(function (i){
        var $xlphoto=$(this);
        $xlphototitle=$xlphoto.find('h1'),$xlphotouser=$xlphoto.find('a');
        xlphoto[i]=[$xlphototitle.prev().find('img')[0].src,$xlphototitle.text(),$xlphototitle.next().text(),$xlphotouser.parent().prev()[0].src,$xlphotouser.text(),$xlphotouser.parent().next().text()];
        xllistcontent+='<li><a><img src="'+ xlphoto[i][0] +'" /></a></li>';
    });
    xlicon=['remove','leftrotate','rightrotate','rerotate','zoomin','zoomout','original','fullscreen','like','comment','keep','download'];
    xlicontitle=['当前图片位置已居中','向左旋转90°','向右旋转90°','当前已显示实际方向','放大','缩小','当前已显示实际大小','全屏浏览','点赞','评论','收藏','保存原图到电脑'];
    for(var i=0;i<xlicon.length;i++){
        i<8 ? xltoolbar+='<a class="xl-photospage-icon xl-ps-icon-'+ xlicon[i] +'" title="'+ xlicontitle[i] +'"></a>' : xlhandletab+='<li title="'+ xlicontitle[i] +'"><a class="xl-photospage-tab-btn xl-photospage-'+ xlicon[i] +'-btn"><i class="xl-photospage-icon xl-ps-icon-'+ xlicon[i] +'"></i></a></li>';
    }
    $xlphotoli.on('click','.xl-photo-img',function (){
        xlimgindex = $(this).parent().index(),xlrotater = 0,xlphotolength=xlphoto.length,xlbtndisabled='xl-photospage-imgdisabled';
        html.css('overflow','hidden').not('html').append('<div id="xl-mask" class="xl-mask"></div><div id="xl-photospage" class="xl-photospage"><div class="xl-photospage-main"></div></div>'); 
        $xlMask=$('#xl-mask');$xlPhotospage=$('#xl-photospage'),$xlphotospageMain=$xlPhotospage.find('div.xl-photospage-main');
        var imgtitEllipsis=function (xlphototit){
            return xlphototit.length <= 18 ? xlphototit + '<em> ' + (xlimgindex+1) + '/' + xlphotolength + '</em>' : xlphototit.substring(0,18) + '<em>… ' + (xlimgindex+1) + '/' + xlphotolength + '</em>';
        };
        $xlphotospageMain.prepend('<div class="xl-photospage-imgarea"><div class="xl-photospage-state"></div><a class="xl-photospage-icon xl-ps-icon-fullscreenclose" title="退出全屏"></a><div class="xl-photospage-img"><img src="'+ xlphoto[xlimgindex][0] +'" /></div><div class="xl-photospage-imgsee"><a class="xl-photospage-icon xl-ps-icon-prevphoto"><!--[if IE 6]>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></a><a class="xl-photospage-icon xl-ps-icon-nextphoto"><!--[if IE 6]>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></a><div class="xl-photospage-imgbar"><a class="xl-photospage-showimglist" title="隐藏图片列表">隐藏图片列表</a><span class="xl-photospage-imgtit" title="'+ xlphoto[xlimgindex][1] +'">'+ imgtitEllipsis(xlphoto[xlimgindex][1]) +'</span><div class="xl-photospage-tool">'+ xltoolbar +'</div></div></div><div class="xl-photospage-imglist"><a class="xl-photospage-icon xl-ps-icon-listprve"></a><div class="xl-photospage-imglist-list clearfix" ><ul>'+ xllistcontent +'</ul></div><a class="xl-photospage-icon xl-ps-icon-listnext"></a></div></div>');
        $xlphotospageImgarea=$xlphotospageMain.find('div.xl-photospage-imgarea'),$xlphotospageState=$xlphotospageImgarea.find('div.xl-photospage-state'),$xlphotospageImg=$xlphotospageImgarea.find('div.xl-photospage-img img'),$xlphotospagePrev=$xlphotospageImgarea.find('a.xl-ps-icon-prevphoto'),$xlphotospageNext=$xlphotospagePrev.next(),$xlphotospageList=$xlphotospageImgarea.find('div.xl-photospage-imglist-list ul'),$xlphotospageListprve=$xlphotospageImgarea.find('a.xl-ps-icon-listprve'),$xlphotospageListli=$xlphotospageList.find('li');
        $xlphotospageImgarea.after('<div class="xl-photospage-intro"><div class="xl-photospage-content"><h1>'+ xlphoto[xlimgindex][1] +'</h1><div class="xl-photospage-handle-tab"><ul class="clearfix">'+ xlhandletab +'</ul></div><div class="xl-photospage-userinfo clearfix"><div class="xl-photospage-user-avatar" onselectstart="return false;"><img src="'+ xlphoto[xlimgindex][3] +'" alt="上传者头像" /></div><div class="xl-photospage-section"><div class="xl-photospage-user-info"><a href="#" title="'+ xlphoto[xlimgindex][4] +'">'+ xlphoto[xlimgindex][4] +'</a></div><div class="xl-photospage-timestamp">'+ xlphoto[xlimgindex][5] +'</div></div></div><p>'+ xlphoto[xlimgindex][2] +'</p></div></div><div class="xl-photospage-vanish"><a class="xl-photospage-icon xl-ps-icon-close" title="关闭"></a></div>');
        $xlphotospageContent=$xlphotospageMain.find('div.xl-photospage-content'),$xlImgTit=$xlphotospageImgarea.find('span.xl-photospage-imgtit'),$xlphotospageClose=$xlphotospageMain.find('a.xl-ps-icon-close'),$xlImgleftrotate=$xlphotospageImgarea.find('a.xl-ps-icon-'+ xlicon[1] +''),$xlImgrerotate=$xlImgleftrotate.next().next(),$xlImgoriginal=$xlphotospageImgarea.find('a.xl-ps-icon-'+ xlicon[6] +''),$xlphotospageTimestamp=$xlphotospageContent.find('div.xl-photospage-timestamp');
        $xlphotospageshowimglist=$xlphotospageImgarea.find('a.xl-photospage-showimglist');
        if($.browser.msie&&($.browser.version !== '10.0')){
            if($.browser.version <= '9.0'){
                $xlImgleftrotate.prev().hide().nextAll().hide();
                $xlImgoriginal.show().prevUntil($xlImgrerotate).show();
                if($.browser.version === '9.0')
                    $xlImgleftrotate.prev().show();
                if($.browser.version <= '7.0'){
                    $xlphotospageshowimglist.hide();
                    $xlphotospageList.parent().parent().hide();
                }
            }
        }
        if(!getreqfullscreen())
            $xlImgoriginal.next().hide();
        var resizeLayout=function (){
            xlimgareawidth=win.width()-500,xlimgareaheight=win.height()-50,xlimgwidth=$xlphotospageImg.width(),xlimgheight=$xlphotospageImg.height();
            xlimgareawidth+300<=1250 ? $xlImgTit.next().hide() : $xlImgTit.next().show();
            $xlphotospageMain.css({'width':xlimgareawidth+300,'height':xlimgareaheight}).parent().fadeTo(300,1);
            $xlphotospageImgarea.removeAttr('style').width(xlimgareawidth);
            if(!ismove&&$xlphotospageImgarea.hasClass('xl-imgarea-fullscreen'))
                xlimgareawidth+=500,xlimgareaheight+50;
            $xlphotospageImg.css({'width':xlimgwidth,'height':xlimgheight,'top':(xlimgareaheight-xlimgheight) / 2-27,'left':(xlimgareawidth-xlimgwidth) / 2,'opacity':'1'});
            if($.browser.msie&&($.browser.version === '6.0')){
                $xlphotospageContent.parent().css('margin-left',xlimgareawidth+15);
                $xlPhotospage.css('top',dom.scrollTop()+25);
                $xlImgTit.next().hide().parent().width(xlimgareawidth);
            }
            //移动端
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                $xlPhotospage.addClass('xl-photospage-mobile');
                $xlphotospageImgarea.width(win.width()).height(win.height()).next().hide().end().parent().width(win.width());
                $xlphotospageImg.css({'top':(xlimgareaheight-xlimgheight) / 2,'left':(xlimgareawidth+500-xlimgwidth) / 2});
                $xlphotospageNext.parent().next().hide();
            }
            xllistnum=Math.round((xlimgareawidth-60) / 61),xllistmaxpage=Math.round((xlphotolength-xllistnum) / 7+1);
            if(isfirst){
                xllistpage=1,xldirectionnum=0;
                while(xlimgindex+1>=xllistnum+xldirectionnum&&xllistpage!=xllistmaxpage&&xlimgindex+1>xllistnum)
                    xllistpage++,xldirectionnum+=7;
                xllistpage!==xllistmaxpage ? listprocess(xllistpage) : listmoveLast();
                listmaxpageImg(xllistmaxpage,xllistpage);
                $xlphotospageListli.removeAttr('class').eq(xlimgindex).addClass('xl-photospage-current').parent().width(xlphotolength*61);
                isfirst=false;
            }
        };
        var listprocess=function (page){
            $xlphotospageList.stop().animate({marginLeft:-7*(page-1)*61});
        };
        var listmoveLast=function (){
            $xlphotospageList.stop().animate({marginLeft:-((xlphotolength-xllistnum)*61+30)});
            xllistpage=xllistmaxpage,xldirectionnum=(xllistmaxpage-1)*7;
            listmaxpageImg(xllistmaxpage,xllistpage);
        };
        var stateImg=function (text){
            $xlphotospageState.text(text).css('left',xlimgareawidth/2-$xlphotospageState.width()/2-20).stop().show().delay(1500).hide(0);
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
                $xlphotospageState.css('left',xlimgareawidth+50/2-$xlphotospageState.width()/2-20);
            }
        };
        var directionImg=function (index){
            xlimgindex+=index;
            if(xlimgindex === xlphotolength)
                xlimgindex = 0;
            if(xlimgindex === -1)
                xlimgindex = xlphotolength-1;
            rerotateimg();
            originalimg();
        };
        var rotateImg=function (rotate){
            xlrotater+=rotate;
            $xlphotospageImg.css({'transition':'transform .2s linear','transform':'rotate('+ xlrotater +'deg)'});
            (xlrotater/90)%4 !== 0 ? isrotate=true : isrotate=false;
            disabledIcon();
        };
        var rerotateimg=function (){
            isrotate=false,xlrotater=0;
            disabledIcon();
            $xlphotospageImg.css({'transform':'','transition':''});
        };
        var originalimg=function (){
            iszoom=false;
            $xlphotospageImg.css({'width':xlimgoriginalwidth,'height':xlimgoriginalheight,'top':$xlphotospageImg.position().top-(xlimgoriginalheight-xlimgheight)/2,'left':$xlphotospageImg.position().left-(xlimgoriginalwidth-xlimgwidth)/2});
            disabledIcon();
        };
        var processImg=function (){
            ismove=false;
            $xlphotospageImg.attr('src',xlphoto[xlimgindex][0]).css({'width':'','height':''}).parent().removeAttr('style');
            $xlphotospageContent.find('h1').text(xlphoto[xlimgindex][1]).end().find('p').text(xlphoto[xlimgindex][2]);
            $xlImgTit.html(imgtitEllipsis(xlphoto[xlimgindex][1])).attr('title',xlphoto[xlimgindex][1]);
            $xlphotospageTimestamp.text(xlphoto[xlimgindex][5]).prev().find('a').text(xlphoto[xlimgindex][4]).attr('title',xlphoto[xlimgindex][4]).end().parent().prev().find('img').attr('src',xlphoto[xlimgindex][3]);
            $xlphotospageListli.removeAttr('class').eq(xlimgindex).addClass('xl-photospage-current');
            resizeLayout();
            disabledIcon();
            xlimgoriginalwidth=xlimgwidth,xlimgoriginalheight=xlimgheight;
        };
        var disabledIcon=function (){
            var imgDisabled=function (name,type,text){
                type==='add' ? $(name).addClass(xlbtndisabled) : $(name).removeClass(xlbtndisabled);
                $(name).attr('title',text);
            };
            ismove ? imgDisabled($xlImgleftrotate.prev(),'del','图片居中') : imgDisabled($xlImgleftrotate.prev(),'add','当前图片位置已居中');
            iszoom ? imgDisabled($xlImgoriginal,'del','实际大小') : imgDisabled($xlImgoriginal,'add','当前已显示实际大小');
            isrotate ? imgDisabled($xlImgrerotate,'del','还原方向') : imgDisabled($xlImgrerotate,'add','当前已显示实际方向');
        };
        var xlphotospageimgLimit=function (size){
            iszoom=true,xlimgwidth=$xlphotospageImg.width(),xlimgheight=$xlphotospageImg.height();
            $xlphotospageImg.parent().css('background','#000');
            var targetwidth=size*xlimgwidth,targetheight=size*xlimgheight;
            if(size>1){
                if(targetwidth>xlimgoriginalwidth*10){
                    return !stateImg('已放到最大');
                }
            }else{
                if(targetwidth<xlimgoriginalwidth/10)
                    return !stateImg('已缩到最小');
            }
            $xlphotospageImg.css({'width':targetwidth,'height':targetheight}).offset({'top':$xlphotospageImg.offset().top-(targetheight-xlimgheight)/2,'left':$xlphotospageImg.offset().left-(targetwidth-xlimgwidth)/2});
            stateImg(Math.round((targetwidth)/xlimgoriginalwidth*100)+'%')
            disabledIcon();
            if(!ismove)
                resizeLayout();
        };
        var listmaxpageImg=function (maxpage,page){
            maxpage===page ? $xlphotospageListprve.next().next().addClass(xlbtndisabled) : $xlphotospageListprve.next().next().removeClass(xlbtndisabled);
            maxpage>=page&&page!=1 ? $xlphotospageListprve.removeClass(xlbtndisabled) : $xlphotospageListprve.addClass(xlbtndisabled);
        };
        var directionList=function (direction){
            if(direction==='next'){
                if(xllistpage===xllistmaxpage){
                    xllistpage=xllistmaxpage;
                    if(!$xlphotospageList.is(':animated'))
                        stateImg('已是最后一页啦');
                    return false;
                }else{
                    if(xllistpage+1===xllistmaxpage)
                        listmoveLast();
                    else{
                        xldirectionnum+=7,xllistpage++;
                        listprocess(xllistpage);
                    }
                }
            }else{
                if(xllistpage===1){
                    if(!$xlphotospageList.is(':animated'))
                        stateImg('已是第一页啦');
                    xldirectionnum=0;
                    return false;
                }
                if(xllistpage<=0){
                    xllistpage=1;
                }else{
                    xldirectionnum-=7,xllistpage--;
                    listprocess(xllistpage);
                }
            }
            listmaxpageImg(xllistmaxpage,xllistpage);
        };
        var directionLast=function (){
            if(xllistnum + xldirectionnum === xlimgindex+1 && xlimgindex+1 >= xllistnum&&xllistpage!=xllistmaxpage)
                directionList('next');
            if((8 + (xldirectionnum-7) === xlimgindex+1 && xllistpage!==1 &&xllistpage!=xllistmaxpage)||(xlphotolength-xllistnum+1===xlimgindex+1&&xllistpage===xllistmaxpage))
                directionList('prev');
        };
        var overflowmaxLength=function (){
            xldirectionnum=0,xllistpage=1;
            listprocess(xllistpage);
            listmaxpageImg(xllistmaxpage,xllistpage);
        };
        processImg();
        $xlphotospageImg.on('mousedown',function (e){
            if(e.button===0){
                ismove=true;
                $(this).parent().css('background','#000');
                disabledIcon();
                var xlismove = true,xlimgx,xlimgy;
                if((xlrotater/90)%4 === 0)
                    xlimgx = e.originalEvent.pageX - $xlphotospageImg.position().left,xlimgy = e.originalEvent.pageY - $xlphotospageImg.position().top
                else
                    xlimgx = e.originalEvent.pageX - $xlphotospageImg.offset().left,xlimgy = e.originalEvent.pageY - $xlphotospageImg.offset().top;
                dom.on('mousemove',function (e){
                    if(xlismove){
                        var xlimgleft=$xlphotospageImg.position().left,xlimgtop=$xlphotospageImg.position().top;
                        xlimgtop<-xlimgheight+30||xlimgleft<-xlimgwidth+30||xlimgleft>xlimgareawidth-30||xlimgtop>xlimgareaheight-120 ? dom.off('mouseup') : dom.on('mouseup',function (){xlismove = false;});
                        (xlrotater/90)% 4 === 0 ? $xlphotospageImg.css({'top':e.originalEvent.pageY - xlimgy,'left':e.originalEvent.pageX - xlimgx}) : $xlphotospageImg.offset({'top':e.originalEvent.pageY - xlimgy,'left':e.originalEvent.pageX - xlimgx});
                    }
                }).on('mouseup',function (){
                    xlismove = false;
                });
            }
            return false;
    	});
        $xlPhotospage.on('click',function (e){
            var target = e.target;
            switch(target){
                case $xlphotospageClose[0] :
                    html.removeAttr('style').not('html').css('background-color','#f4f4f4');
                    if(!($.browser.msie&&($.browser.version < '9.0'||$.browser.version === '10.0'))){
                        $xlMask.fadeTo(300,0).next().fadeTo(250,0);
                        setTimeout(function (){$xlPhotospage.detach();$xlMask.detach()},400);
                        isfirst=true;
                    }else{
                        $xlMask.detach();
                        $xlPhotospage.detach();
                    }
                    dom.off('keyup');
                    break;
                case $xlphotospagePrev[0] :
                    xlimgindex===0 ? listmoveLast() : directionLast();
                    directionImg(-1);
                    processImg();
                    break;
                case $xlphotospageNext[0] :
                    if(xlimgindex+1===xlphotolength)
                        overflowmaxLength();
                    xllistpage===xllistmaxpage ? listmoveLast() : directionLast();
                    directionImg(+1);
                    processImg();
                    break;
                case $xlImgleftrotate.prev()[0] :
                    if($xlImgleftrotate.prev().hasClass(xlbtndisabled)){
                        stateImg('图片已居中');
                        break;
                    }
                    ismove=false;
                    $xlphotospageImg.css({'top':(xlimgareaheight-xlimgheight) / 2-27,'left':(xlimgareawidth-xlimgwidth) / 2});
                    disabledIcon();
                    break;
                case $xlImgleftrotate[0] :
                    rotateImg(-90);
                    break;
                case $xlImgleftrotate.next()[0] :
                    rotateImg(90);
                    break;
                case $xlImgrerotate[0] :
                    if($xlImgrerotate.hasClass(xlbtndisabled)){
                        stateImg('已显示实际方向');
                        break;
                    }
                    rerotateimg();
                    break;
                case $xlImgrerotate.next()[0] :
                    xlphotospageimgLimit(1.1);
                    break;
                case $xlImgoriginal.prev()[0] :
                    xlphotospageimgLimit(0.9);
                    break;
                case $xlImgoriginal[0] :
                    if($xlImgoriginal.hasClass(xlbtndisabled)){
                        stateImg('已显示实际大小');
                        break;
                    }
                    originalimg();
                    break;
                case $xlImgoriginal.next()[0] :
                    if(getreqfullscreen()){
                        !getfullscreenelement() ? getreqfullscreen().call($xlphotospageImgarea[0]) : getexitfullscreen().call(document);
                        if(!$xlImgleftrotate.prev().hasClass(xlbtndisabled))
                            $xlImgleftrotate.prev().click();
                        win.resize();
                    }else{
                        stateImg('浏览器不支持全屏');
                    }
                    break;
                case $xlphotospageState.next()[0] :
                    $xlImgoriginal.next().click();
                    break;
                case $xlphotospageListprve[0] :
                    directionList('prev');
                    break;
                case $xlphotospageListprve.next().next()[0] :
                    directionList('next');
                    break;
                case $xlphotospageshowimglist[0] :
                    $xlphotospageshowimglist.toggle(function(){
                        $(this).text('显示图片列表').attr('title','显示图片列表');
                        $xlphotospageNext.next().css('bottom','0').addClass('hide');
                        $xlphotospageList.parent().parent().css('height','0');
                    },function(){
                        $(this).text('隐藏图片列表').attr('title','隐藏图片列表');;
                        $xlphotospageNext.next().removeAttr('style').removeClass('hide');
                        $xlphotospageList.parent().parent().removeAttr('style');
                    });
                    $xlphotospageshowimglist.trigger('click');
                    break;
                default : return false;
            }
            return false;
        });
        $xlMask.on('dblclick',function (){
            $xlphotospageClose.click();
        });
        $xlphotospageImg.parent().on('dblclick',function (){
            if(getreqfullscreen())
                $xlImgoriginal.next().click();
        }).on('mousewheel DOMMouseScroll', function (e) {
            if($.browser.msie&&$.browser.version === '6.0')
                return false;
            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
            delta > 0 ? xlphotospageimgLimit(1.1) : xlphotospageimgLimit(0.9);
        });
        $xlphotospageList.on('click','a',function (){
            xlimgindex = $(this).parent().index();
            directionLast();
            processImg();
            rerotateimg();
            return !originalimg();
        });
        dom.on('keyup',function (event){
            var code = event.keyCode || event.which || event.charCode;
            switch(code){
                case 27 :
                    if($xlphotospageImgarea.hasClass('xl-imgarea-fullscreen'))
                        break;
                    $xlphotospageClose.click();
                    break;
                case 37 :
                    if(xlimgindex!==0)
                        $xlphotospagePrev.click();
                    break;
                case 38 :
                    xlphotospageimgLimit(1.1);
                    break;
                case 39 :
                    if(xlimgindex+1===xlphotolength)
                        overflowmaxLength();
                    $xlphotospageNext.click();
                    break;
                case 40 :
                    xlphotospageimgLimit(0.9);
                    break;
                case 76 :
                    rotateImg(-90);
                    break;
                case 82 :
                    rotateImg(90);
                    break;
                default : return false;
            }
            return false;
        });
        win.on('resize',function () {
            if (timer)
                clearTimeout(timer);
            timer = setTimeout(function (){
                if(getfullscreenelement()){
                    $xlImgoriginal.next().addClass('xl-photospage-imgexitfullscreen');
                    $xlphotospageImgarea.addClass('xl-imgarea-fullscreen').next().hide();
                }else{
                    $xlImgoriginal.next().removeClass('xl-photospage-imgexitfullscreen');
                    $xlphotospageImgarea.removeClass('xl-imgarea-fullscreen').next().show();
                }
                resizeLayout();
            }, 200);
        });
    });
});