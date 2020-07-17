var toggleSnippetPanel = function(p_id) {
  v_panel_id = p_id + '_panel_snippet';
  v_element = $('#' + v_panel_id);
  var v_target_tag = v_connTabControl.selectedTab.tag.tabControl.selectedTab.tag;
  var v_target_tag_div_result_top = v_target_tag.div_result.getBoundingClientRect().height - 25;
  var v_snippet_tag = v_connTabControl.snippet_tag;
  v_element.toggleClass('omnidb__panel--slide-in');
  if (v_element.hasClass('omnidb__panel--slide-in')) {
    v_snippet_tag.isVisible = true;
    v_element.css('transform', 'translateY(-' + v_target_tag_div_result_top + 'px)');
  }
  else {
    v_snippet_tag.isVisible = false;
    v_element.css('transform','translateY(0px)');
  }
}

var v_createSnippetPanelFunction = function(p_index) {

  v_connTabControl.removeLastTab();

  var v_tab = v_connTabControl.createTab({
    p_icon: `<i class="fas fa-align-left icon-tab-title"></i>`,
    p_name: `Snippets`,
    p_close: false,
    p_selectable: false,
    p_clickFunction: function() {
      toggleSnippetPanel(this.id);
    },
  });

  v_connTabControl.selectTab(v_tab);

  var v_html =
  "<div id='" + v_tab.id + "_panel_snippet' class='omnidb__panel omnidb__panel--snippet'>" +

    "<button type='button' onclick='toggleSnippetPanel(" + '"' + v_tab.id + '"' + ")' class='px-4 btn btn-secondary omnidb__panel__toggler'><i class='fas fa-arrows-alt-v'></i></button>" +

    "<div class='container-fluid' style='position: relative;'>" +
      "<div class='row'>" +
        "<div id='" + v_tab.id + "_snippet_div_left' class='omnidb__workspace__div-left col-md-2'>" +
          "<div class='row'>" +

            // "<div onmousedown='resizeHorizontal(event)' style='width: 10px; height: 100%; cursor: ew-resize; position: absolute; top: 0px; right: 0px;'><div class='resize_line_vertical' style='width: 5px; height: 100%; border-right: 1px dashed #acc4e8;'></div><div style='width:5px;'></div></div>" +


            "<div class='omnidb__workspace__content-left'>" +
              "<div id='" + v_tab.id + "_snippet_tree' style='overflow: auto; flex-grow: 1;'></div>" +
            "</div>" +
          "</div>" +
          "<div onmousedown='resizeSnippetHorizontal(event)' style='position:absolute;height: 100%;width: 10px;cursor: ew-resize;border-right: 1px dashed #acc4e8;top: 0px;right: 8px;'></div>" +
        "</div>" +//.div_left
        "<div id='" + v_tab.id + "_snippet_div_right' class='omnidb__workspace__div-right col-md-10 pt-0' style='position: relative;'>" +
          // "<div class='row'>" +
            "<div id='" + v_tab.id + "_snippet_tabs' class='w-100'></div>" +
          // "</div>" +
        "</div>" +//.div_right
      "</div>" +//.row

    "</div>" +//.container-fluid

  "</div>";

  v_connTabControl.snippet_div = document.createElement('div');
  v_connTabControl.snippet_div.id = v_tab.id + '_snippet';
  v_connTabControl.snippet_div.innerHTML = v_html;
  document.getElementById(v_connTabControl.id).append(v_connTabControl.snippet_div);

  var v_currTabControl = createTabControl({
    p_div: v_tab.id + '_snippet_tabs',
    p_hierarchy: 'secondary'
  });

  v_currTabControl.createTab(
  {
    p_name: '+',
    p_close: false,
    p_selectable: false,
    p_clickFunction: function(e) {
      showMenuNewTab(e);
    }
  });

  var v_tag = {
    tab_id: v_tab.id,
    tabControl: v_currTabControl,
    tabTitle: 'teste',
    divLeft: document.getElementById(v_tab.id + '_snippet_div_left'),
    divPanel: document.getElementById(v_tab.id + '_panel_snippet'),
    divRight: document.getElementById(v_tab.id + '_snippet_div_right'),
    divTree: document.getElementById(v_tab.id + '_snippet_tree'),
    connTabControl: v_connTabControl,
    isVisible: false,
    mode: 'snippets'
  };

  v_tab.tag = v_tag;

  v_connTabControl.snippet_tag = v_tag;

  getTreeSnippets(v_tag.divTree.id);

  v_connTabControl.tag.createSnippetTextTab('Welcome');
  v_connTabControl.snippet_tag.tabControl.selectedTab.tag.editor.setValue('Welcome to OmniDB!');
  v_connTabControl.snippet_tag.tabControl.selectedTab.tag.editor.clearSelection();
  v_connTabControl.snippet_tag.tabControl.selectedTab.tag.editor.gotoLine(0, 0, true);

  v_connTabControl.createTab('+',false,v_connTabControl.tag.createConnTab,false);

  //setTimeout(function() {
  //  refreshTreeHeight();
  //},10);

}