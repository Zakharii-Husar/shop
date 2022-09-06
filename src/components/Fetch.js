import { useDispatch } from 'react-redux';
import { fetchJSON } from '../state/fetchSlice';

function Fetch() {
    const dispatch = useDispatch();
    const fetchData = () => {
            fetch('./data.json')
                .then(response => response.json())
                .then( data => dispatch(fetchJSON( data)))
    };

    fetchData();
    return false
}

export default Fetch;