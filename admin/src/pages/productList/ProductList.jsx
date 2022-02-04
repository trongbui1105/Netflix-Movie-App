import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { useEffect } from "react";
import { deleteMovie, getMovies } from "../../context/movieContext/ApiCall";


export default function ProductList() {
  const [listMovies, setListMovies] = useState([]);
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  useEffect(() => {
    if (movies.length !== 0 && listMovies.length === 0) {
      setListMovies(movies);
    }
  }, [listMovies, movies]);

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "year", headerName: "Year", width: 150 },
    { field: "limit", headerName: "Limit", width: 150 },
    { field: "isSeries", headerName: "isSeries", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/product/" + params.row._id, movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  // const data = {columns: columns, rows: listMovies};

  return (
    <div className="productList">
      <DataGrid
        rows={listMovies}
        disableSelectionOnClick
        // loading={listMovies.length === 0}
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(r) => r._id}
        rowHeight={60}
      />
    </div>
  );
}
