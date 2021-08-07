const trendTabs = document.querySelectorAll('#trend-section .trend-tab-index li.tab-btn');

const trendTabClick = (e) => {
    const tabIndex = document.querySelectorAll('#trend-section li.tab-btn');
    const tabContents = document.querySelectorAll('#trend-section ol.tab-content');
    const tabIndexId = e.target.getAttribute('data-tab');
    const currentTab = document.getElementById(tabIndexId);

    // remove current class
    tabIndex.forEach(
        element => element.classList.remove("current")
    );

    tabContents.forEach(
        element => element.classList.remove("current")
    );

    // add current class
    e.target.classList.add("current");
    currentTab.classList.add("current");
};

window.onload = () => {
    trendTabs.forEach(tab =>
        tab.addEventListener("click", trendTabClick, false)
    );

    new Slick('#opinion-section .column-section', 1);
    new Slick('#section2', 4);
    new Slick('#section3', 4);
}
