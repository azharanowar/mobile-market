const getMobilesDataByKeyword = async(keyword) => {
    const dataURL = `https://openapi.programming-hero.com/api/phones?search=${keyword}`;
    const response = await fetch(dataURL);
    const data = await response.json();

    displayMobilesData(data.data);
}

const displayMobilesData = mobiles => {

    if (mobiles.length === 0) {
        document.getElementById("productsNotFoundMessage").style.display = 'block';
        document.getElementById("preloaderSection").style.display = 'none';
    } else {
        document.getElementById("productsNotFoundMessage").style.display = 'none';
    }

    if (mobiles.length > 12) {
        firstTwelvesMobiles = mobiles.slice(0, 12);
        restMobiles = mobiles.slice(12, mobiles.length);
        showMobilesDataInWebsite(firstTwelvesMobiles);
        document.getElementById("showAllProductsBtn").style.display = 'block';
    }

    document.getElementById("showAllProductsBtn").addEventListener('click', () => {
        showMobilesDataInWebsite(restMobiles);
        document.getElementById("showAllProductsBtn").style.display = 'none';
    });

    
}

const showMobilesDataInWebsite = mobiles => {
    const mobilesCardsSection = document.getElementById("mobilesCardsSection");
    mobiles.forEach(mobile => {
        const mobileName = mobile.phone_name;
        const mobileBrand = mobile.brand;
        const mobileImageURL = mobile.image;
        const mobileSlug = mobile.slug;

        const newMobileCardDiv = document.createElement('div');
        newMobileCardDiv.classList.add('col');
        newMobileCardDiv.innerHTML = `<div class="card h-100 rounded-4 shadow-sm">
            <img src="${mobileImageURL}" class="card-img-top px-5 pt-4 w-75 mx-auto" alt="${mobileName} Image">
                <div class="card-body text-center">
                    <h4 class="card-title">${mobileName}</h4>
                    <p class="text-muted"><strong>Brand</strong>: ${mobileBrand}</p>
                    <p class="text-muted">Lorem ipsum dolor, sit amet helle  e consectetur adipisicing omnis!</p>
                    <button type="button" class="btn btn-secondary w-100 py-2 rounded-3" onclick="">Quick View</button>
                </div>
            </div>`;

        mobilesCardsSection.appendChild(newMobileCardDiv);
        document.getElementById("preloaderSection").style.display = 'none';
    });
}


const getMobileDataByURL = async(url) => {

}

document.getElementById("searchBtn").addEventListener('click', () => {
    const searchBar = document.getElementById("searchBar");
    if(searchBar.value) {
        document.getElementById("preloaderSection").style.display = 'block';
        document.getElementById("mobilesCardsSection").innerHTML = '';
        getMobilesDataByKeyword(searchBar.value);
    }
    searchBar.value = '';
});

getMobilesDataByKeyword('a');