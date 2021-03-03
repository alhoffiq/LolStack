
const SearchChamp = ({length, setShow}) => {

    async function search() {

        setShow(length);

        // Pulled straight from W3
        // Declare variables
        let searchName, i, txtValue;
        const input = document.getElementById('myInput');
        const filter = input.value.toUpperCase();
        const ol = document.getElementsByTagName('ol')[0];
        const li = ol.getElementsByTagName('li');
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            searchName = li[i].getElementsByTagName('a')[0];
            txtValue = searchName.textContent || searchName.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
    }

    return (
        <input type="text" className="text-center mx-auto" id="myInput" onKeyUp={() => search()} placeholder="Search for champions.."></input>

    );
};

export default SearchChamp;