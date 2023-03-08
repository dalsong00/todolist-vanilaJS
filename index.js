const $ = (selector) => document.querySelector(selector);

const updateItemCount = () => {
  const itemCount = document.querySelectorAll("li").length;
  $("#item-count").innerText = `${itemCount} item left`;
  if (itemCount === 0) {
    removeVisibleClass();
  }
};

const removeVisibleClass = () => {
  $("#item-under-container").classList.remove("visible");
  $("#checkIcon").classList.remove("visible");
};

function App() {
  // 🌕 [추가하기]
  const addNewItem = () => {
    const newItemContent = $("#new-item").value;
    const newItemTemplate = (newItemContent) => {
      return `<li class="todo-item">
        <div clsas="todo-container">
          <input class="toggle" type="checkbox" />
          <label class="item-content">${newItemContent}</label>
          <button class="remove">X</button>
        </div>
      </li>`;
    };
    $("#todo-item-list").insertAdjacentHTML(
      "beforeend",
      newItemTemplate(newItemContent)
    );
  };

  $("#new-item").addEventListener("keypress", (e) => {
    if (!$("#new-item").value) {
      return;
    }
    if (e.key === "Enter") {
      addNewItem();
      $("#item-under-container").classList.add("visible");
      $("#checkIcon").classList.add("visible");
      updateItemCount();
      $("#new-item").value = "";
    }
  });

  // 🌕 [삭제하기]

  $("#todo-item-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {
      e.target.closest("li").remove();
      updateItemCount();
    }
  });

  // 🌕 [수정하기]
  $("#todo-item-list").addEventListener("dblclick", (e) => {
    inputNewItem(e);
  });

  $("#todo-item-list").addEventListener("keypress", (e) => {
    updateItem(e);
  });
  // [TODO] : ESC 누르면 취소

  // 더블 클릭 시 input 창으로 변경
  const inputNewItem = (e) => {
    const oldItemContent = e.target.closest("label").innerText;
    e.target.closest("li").innerHTML = `<div clsas="todo-container">
    <input class="updateItemContent" type="text" value=${oldItemContent}>
  </div>`;
  };

  // 엔터를 누르면 변경된 내용으로 저장
  const updateItem = (e) => {
    const newItemContent = $(".updateItemContent").value;
    if (e.key === "Enter") {
      e.target.closest("li").innerHTML = `<div clsas="todo-container">
        <input class="toggle" type="checkbox" />
        <label class="item-content">${newItemContent}</label>
        <button class="remove">X</button>
      </div>`;
    }
  };
  // 🌕 [전체 선택 및 전체 선택 해제]

  const selectAllItem = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach((checkbox) => {
      if ($("#checkIcon").classList.contains("clicked")) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  };

  $("#checkIcon").addEventListener("click", () => {
    if ($("#checkIcon").classList.contains("clicked")) {
      $("#checkIcon").classList.remove("clicked");
    } else {
      $("#checkIcon").classList.add("clicked");
    }
    selectAllItem();
  });

  // [ToDO: 선택 시 콘텐츠에 중앙선 긋기]

  // const checkedBox = $("input:checked");
  // console.log(checkedBox);

  const lineThroughItem = (e) => {
    $(".item-content").classList.add("checked");
    //
  };
  // [버튼 클릭 시 filter해서 리스트 보여주기]
  $("#active-btn").addEventListener("click", () => {
    filterActive();
  });

  const filterActive = () => {
    const checkBoxes = document.querySelectorAll("input[type='checkbox']");
    const result = [...checkBoxes].filter((checkBox) => {
      return checkBox.checked === true;
    });
    console.log(result);
  };
}

App();
