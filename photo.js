/**
 * photo.js v2.1.8
 * @author KkakaMann
 * @mailto KkakaMann24@gmail.com  KkakaMann@163.com
 */
$(function (){
    var root = document.documentElement,timer,$xlphotoli=$('.xl-photo li'),$xlMask,$xlPhotospage,$xlphotospageMain,$xlphotospageImgarea,$xlphotospageState,$xlphotospageImg,$xlphotospageClose,$xlphotospagePrev,$xlphotospageNext,$xlphotospageContent,$xlImgTit,$xlImgleftrotate,$xlImgrerotate,$xlImgoriginal,$xlphotospageTimestamp,$xlphotospageChoose,$xlphotospageChooseprve,$xlphotospageChooseli,$xlphoto,$xlphotouser,xlphotolength,xlimgwidth,xlimgoriginalwidth,xlimgheight,xlimgareawidth,xlimgareaheight,xlimgoriginalheight,xlimgindex,xlrotater,xlchoosepage,xlchoosemaxpage,xlchoosenum,xldirectionnum,xlchoosecontent='',isfirst=true,ismove=iszoom=isrotate=false,xlphoto=[],xltoolbar='',xlhandletab='',xlicon=[],xlicontitle=[];
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
        $xlphoto=$(this).find('h1'),$xlphotouser=$(this).find('a');
        xlphoto[i]=[$xlphoto.prev().find('img')[0].src,$xlphoto.text(),$xlphoto.next().text(),$xlphotouser.parent().prev()[0].src,$xlphotouser.text(),$xlphotouser.parent().next().text()];
        xlchoosecontent+='<li><a><img src="'+ xlphoto[i][0] +'" /></a></li>';
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
        $xlphotospageMain.prepend('<div class="xl-photospage-imgarea"><div class="xl-photospage-state"></div><a class="xl-photospage-icon xl-ps-icon-fullscreenclose" title="退出全屏"></a><div class="xl-photospage-img"><img src="'+ xlphoto[xlimgindex][0] +'" /></div><div class="xl-photospage-imgsee"><a class="xl-photospage-icon xl-ps-icon-prevphoto"><!--[if IE 6]>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></a><a class="xl-photospage-icon xl-ps-icon-nextphoto"><!--[if IE 6]>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<![endif]--></a><div class="xl-photospage-imgbar"><span class="xl-photospage-imgtit" title="'+ xlphoto[xlimgindex][1] +'">'+ imgtitEllipsis(xlphoto[xlimgindex][1]) +'</span><div class="xl-photospage-tool">'+ xltoolbar +'</div></div></div><div class="xl-photospage-imgchoose"><a class="xl-photospage-icon xl-ps-icon-chooseprve"></a><div class="xl-photospage-imgchoose-list clearfix" ><ul>'+ xlchoosecontent +'</ul></div><a class="xl-photospage-icon xl-ps-icon-choosenext"></a></div></div>');
        $xlphotospageImgarea=$xlphotospageMain.find('div.xl-photospage-imgarea'),$xlphotospageState=$xlphotospageImgarea.find('div.xl-photospage-state'),$xlphotospageImg=$xlphotospageImgarea.find('div.xl-photospage-img img'),$xlphotospagePrev=$xlphotospageImgarea.find('a.xl-ps-icon-prevphoto'),$xlphotospageNext=$xlphotospagePrev.next(),$xlphotospageChoose=$xlphotospageImgarea.find('div.xl-photospage-imgchoose-list ul'),$xlphotospageChooseprve=$xlphotospageImgarea.find('a.xl-ps-icon-chooseprve'),$xlphotospageChooseli=$xlphotospageChoose.find('li');
        $xlphotospageImgarea.after('<div class="xl-photospage-intro"><div class="xl-photospage-content"><h1>'+ xlphoto[xlimgindex][1] +'</h1><div class="xl-photospage-handle-tab"><ul class="clearfix">'+ xlhandletab +'</ul></div><div class="xl-photospage-userinfo clearfix"><div class="xl-photospage-user-avatar" onselectstart="return false;"><img src="'+ xlphoto[xlimgindex][3] +'" alt="上传者头像" /></div><div class="xl-photospage-section"><div class="xl-photospage-user-info"><a href="#" title="'+ xlphoto[xlimgindex][4] +'">'+ xlphoto[xlimgindex][4] +'</a></div><div class="xl-photospage-timestamp">'+ xlphoto[xlimgindex][5] +'</div></div></div><p>'+ xlphoto[xlimgindex][2] +'</p></div></div><div class="xl-photospage-vanish"><a class="xl-photospage-icon xl-ps-icon-close" title="关闭"></a></div>');
        $xlphotospageContent=$xlphotospageMain.find('div.xl-photospage-content'),$xlImgTit=$xlphotospageImgarea.find('span.xl-photospage-imgtit'),$xlphotospageClose=$xlphotospageMain.find('a.xl-ps-icon-close'),$xlImgleftrotate=$xlphotospageImgarea.find('a.xl-ps-icon-'+ xlicon[1] +''),$xlImgrerotate=$xlImgleftrotate.next().next(),$xlImgoriginal=$xlphotospageImgarea.find('a.xl-ps-icon-'+ xlicon[6] +''),$xlphotospageTimestamp=$xlphotospageContent.find('div.xl-photospage-timestamp');
        if($.browser.msie&&($.browser.version !== '10.0')){
            if($.browser.version <= '9.0'){
                $xlImgleftrotate.prev().hide().nextAll().hide();
                $xlImgoriginal.show().prevUntil($xlImgrerotate).show();
                if($.browser.version === '9.0')
                    $xlImgleftrotate.prev().show();
                if($.browser.version <= '7.0')
                    $xlphotospageChoose.parent().parent().hide();
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
            xlchoosenum=Math.round((xlimgareawidth-60) / 61),xlchoosemaxpage=Math.round((xlphotolength-xlchoosenum) / 7+1);
            if(isfirst){
                xlchoosepage=1,xldirectionnum=0;
                while(xlimgindex+1>=xlchoosenum+xldirectionnum&&xlchoosepage!=xlchoosemaxpage&&xlimgindex+1>xlchoosenum)
                    xlchoosepage++,xldirectionnum+=7;
                xlchoosepage!==xlchoosemaxpage ? chooseprocess(xlchoosepage) : choosemoveLast();
                choosemaxpageImg(xlchoosemaxpage,xlchoosepage);
                $xlphotospageChooseli.removeAttr('class').eq(xlimgindex).addClass('xl-photospage-current').parent().width(xlphotolength*61);
                isfirst=false;
            }
        };
        var chooseprocess=function (page){
             $xlphotospageChoose.stop().animate({marginLeft:-7*(page-1)*61});
        };
        var choosemoveLast=function (){
            $xlphotospageChoose.stop().animate({marginLeft:-((xlphotolength-xlchoosenum)*61+30)});
            xlchoosepage=xlchoosemaxpage,xldirectionnum=(xlchoosemaxpage-1)*7;
            choosemaxpageImg(xlchoosemaxpage,xlchoosepage);
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
            $xlphotospageChooseli.removeAttr('class').eq(xlimgindex).addClass('xl-photospage-current');
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
        var choosemaxpageImg=function (maxpage,page){
            maxpage===page ? $xlphotospageChooseprve.next().next().addClass(xlbtndisabled) : $xlphotospageChooseprve.next().next().removeClass(xlbtndisabled);
            maxpage>=page&&page!=1 ? $xlphotospageChooseprve.removeClass(xlbtndisabled) : $xlphotospageChooseprve.addClass(xlbtndisabled);
        };
        var directionChoose=function (direction){
            if(direction==='next'){
                if(xlchoosepage===xlchoosemaxpage){
                    xlchoosepage=xlchoosemaxpage;
                    if(!$xlphotospageChoose.is(':animated'))
                        stateImg('已是最后一页啦');
                    return false;
                }else{
                    if(xlchoosepage+1===xlchoosemaxpage)
                        choosemoveLast();
                    else{
                        xldirectionnum+=7,xlchoosepage++;
                        chooseprocess(xlchoosepage);
                    }
                }
            }else{
                if(xlchoosepage===1){
                    if(!$xlphotospageChoose.is(':animated'))
                        stateImg('已是第一页啦');
                    xldirectionnum=0;
                    return false;
                }
                if(xlchoosepage<=0){
                    xlchoosepage=1;
                }else{
                    xldirectionnum-=7,xlchoosepage--;
                    chooseprocess(xlchoosepage);
                }
            }
            choosemaxpageImg(xlchoosemaxpage,xlchoosepage);
        };
        var directionLast=function (){
            if(xlchoosenum + xldirectionnum === xlimgindex+1 && xlimgindex+1 >= xlchoosenum&&xlchoosepage!=xlchoosemaxpage)
                directionChoose('next');
            if((8 + (xldirectionnum-7) === xlimgindex+1 && xlchoosepage!==1 &&xlchoosepage!=xlchoosemaxpage)||(xlphotolength-xlchoosenum+1===xlimgindex+1&&xlchoosepage===xlchoosemaxpage))
                directionChoose('prev');
        };
        var overflowmaxLength=function (){
            xldirectionnum=0,xlchoosepage=1;
            chooseprocess(xlchoosepage);
            choosemaxpageImg(xlchoosemaxpage,xlchoosepage);
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
                    xlimgindex===0 ? choosemoveLast() : directionLast();
                    directionImg(-1);
                    processImg();
                    break;
                case $xlphotospageNext[0] :
                    if(xlimgindex+1===xlphotolength)
                        overflowmaxLength();
                    xlchoosepage===xlchoosemaxpage ? choosemoveLast() : directionLast();
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
                case $xlphotospageChooseprve[0] :
                    directionChoose('prev');
                    break;
                case $xlphotospageChooseprve.next().next()[0]:
                    directionChoose('next');
                    break;
                default : return false;
            }
            return false;
        }).find('a').attr({'hidefocus':'true','href':'javascript:;'});
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
        $xlphotospageChoose.on('click','a',function (){
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