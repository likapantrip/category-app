function category (){
  const parentCategory = document.getElementById('parent-category')
  const selectWrap = document.getElementById('select-wrap')
  if (!parentCategory){ return false;}

  // 選択フォームを繰り返し表示する
  const selectChildElement = (selectForm) => {
    if (document.getElementById(selectForm) !== null) {
      document.getElementById(selectForm).remove()
    }
  }

  // Ajax通信を可能にする
  const XHR = new XMLHttpRequest();
  const categoryXHR = (id) => {
    XHR.open("GET", `/items/${id}/search`, true);
    XHR.responseType = "json";
    XHR.send();
  }

  // 子カテゴリーの値を全て取得する関数
  const getChildCategoryData = () => {
    const parentValue = parentCategory.value
    categoryXHR(parentValue)

    // コントローラーからJSON形式でレスポンスの受信が成功した時に、onloadが発火する
    XHR.onload = () => {
      const items = XHR.response.item;
      appendChildSelect(items)
      const childCategory = document.getElementById('child-select')

      // 子カテゴリーのプルダウンの値が変化することによって孫カテゴリーのイベント発火する
      childCategory.addEventListener('change', () => {
        selectChildElement('grand-child-select-wrap')
        getGrandchildCategoryData(childCategory)
      })
    }
  }

  // 子カテゴリーの値を全て取得する関数
  const appendChildSelect = (items) => {

    const childWrap = document.createElement('div')
    const childSelect = document.createElement('select')

    childWrap.setAttribute('id', 'child-select-wrap')
    childSelect.setAttribute('id', 'child-select')

    //子カテゴリーの初期値設定
    const childOption = document.createElement('option')
    childOption.innerHTML = '---'
    childSelect.appendChild(childOption)

    // forEach文でitem（子カテゴリーの値）を繰り返す
    items.forEach(item => {
      const childOption = document.createElement('option')
      childOption.innerHTML = item.name
      childOption.setAttribute('value', item.id)
      childSelect.appendChild(childOption)
    });

    childWrap.appendChild(childSelect)
    selectWrap.appendChild(childWrap)
  }

  // 孫カテゴリーの値を全て取得する関数 
  const getGrandchildCategoryData = (grandchildCategory) => {
    const grandchildValue = grandchildCategory.value
    categoryXHR(grandchildValue)

    // コントローラーからJSON形式でレスポンスの受信が成功した時に、onloadが発火する
    XHR.onload = () => {
      const GrandChildItems = XHR.response.item;
      appendGrandChildSelect(GrandChildItems)
    }
  }

  // 孫カテゴリーのプルダウンを表示させる関数
  const appendGrandChildSelect = (items) => {

    const childWrap = document.getElementById('child-select-wrap')
    const grandchildWrap = document.createElement('div')
    const grandchildSelect = document.createElement('select')

    grandchildWrap.setAttribute('id', 'grand-child-select-wrap')
    grandchildSelect.setAttribute('id', 'grand-child-select')
    grandchildSelect.setAttribute('name', 'item[category_id]') // category_idの値を上書き

    //孫カテゴリーの初期値設定
    const grandchildOption = document.createElement('option')
    grandchildOption.innerHTML = '---'
    grandchildOption.setAttribute('value', 0)
    grandchildSelect.appendChild(grandchildOption)

    // forEach文でitem（孫カテゴリーの値）を繰り返す
    items.forEach(item => {
      const grandchildOption = document.createElement('option')
      grandchildOption.innerHTML = item.name
      grandchildOption.setAttribute('value', item.id)
      grandchildSelect.appendChild(grandchildOption)
    });

    grandchildWrap.appendChild(grandchildSelect)
    childWrap.appendChild(grandchildWrap)
  }

  // 親カテゴリーを選択した後の発火するイベント
  parentCategory.addEventListener('change', function () {
    selectChildElement('child-select-wrap')
    getChildCategoryData()
  })
};

window.addEventListener('turbo:load', category);
window.addEventListener("turbo:render", category);