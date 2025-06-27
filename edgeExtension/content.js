(function() {
  'use strict';

  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      default:
        return 0;
    }
  }

  // 自动点击SweetAlert弹窗的确定按钮
  function autoClickSweetAlertConfirm() {
    const sweetAlertConfirm = document.querySelector('.sweet-alert .sa-button-container .confirm');
    if (sweetAlertConfirm && sweetAlertConfirm.offsetParent !== null) {
      sweetAlertConfirm.click();
      console.log('自动点击SweetAlert确定按钮');
      return true;
    }

    // 方法2: 查找包含"确定"文本的按钮
    const buttons = document.querySelectorAll('button');
    for (let btn of buttons) {
      if (btn.textContent.trim() === '确定' && btn.offsetParent !== null) {
        btn.click();
        console.log('自动点击确定按钮');
        return true;
      }
    }

    // 方法3: 查找SweetAlert相关的其他可能选择器
    const sweetAlertBtn = document.querySelector('.sweet-alert button[tabindex="1"]');
    if (sweetAlertBtn && sweetAlertBtn.offsetParent !== null) {
      sweetAlertBtn.click();
      console.log('自动点击SweetAlert按钮');
      return true;
    }

    return false;
  }

  // 检测iframe内的弹窗
  function checkIframeAlert() {
    try {
      const iframe = document.querySelector('.classcenter-chapter1 iframe');
      if (iframe && iframe.contentDocument) {
        const iframeDoc = iframe.contentDocument;

        // 在iframe内查找确定按钮
        const confirmBtn = iframeDoc.querySelector('button');
        if (confirmBtn && confirmBtn.textContent.trim() === '确定' && confirmBtn.offsetParent !== null) {
          confirmBtn.click();
          console.log('自动点击iframe内确定按钮');
          return true;
        }
      }
    } catch (e) {
      // 跨域限制，忽略错误
    }
    return false;
  }

  window.onload = function() {
    // 定时检测并点击弹窗确定按钮
    const alertInterval = setInterval(function() {
      if (autoClickSweetAlertConfirm() || checkIframeAlert()) {
        // 找到并点击了按钮, 可以选择清除定时器或继续检测
        // clearInterval(alertInterval);
      }
    }, 1000); // 每秒检测一次

    let pppplay = setInterval(function() {
      // 先检测弹窗
      autoClickSweetAlertConfirm();
      checkIframeAlert();

      if ($(".classcenter-chapter1 iframe").contents().find(".layui-layer-content iframe").length > 0) {
        setTimeout(function() {
          $(".classcenter-chapter1 iframe").contents().find(".layui-layer-content iframe").contents().find("#questionid~div button").trigger("click")
        }, randomNum(15, 40) * 100);
      } else {
        $(".classcenter-chapter1 iframe").contents().find("video").trigger("play")
      }
      console.log(new Date().getTime(), $(".classcenter-chapter1 iframe").length, $(".classcenter-chapter1 iframe").contents().find(".layui-layer-content iframe").length)
    }, 5000);

    setTimeout(function() {
      $(".classcenter-chapter1 iframe").contents().find("video").on("timeupdate", function() {
        if (Math.ceil(this.currentTime) >= Math.ceil(this.duration)) {
          let flag = false;
          $(".classcenter-chapter2 ul li").each(function(t) {
            console.log($(this).css("background-color") == "rgb(204, 197, 197)")
            if ($(this).css("background-color") != "rgb(204, 197, 197)") {
              if ($(this).find("span").text() != "[100%]") {
                flag = true;
                $(this).trigger("click");
                return false;
              }
            }
          });
          if (!flag) {
            clearInterval(pppplay);
            clearInterval(alertInterval);
          }
        }
      })
    }, 8000);
  }
})();
