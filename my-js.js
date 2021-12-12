async function my_code() {

const SQL =  await initSqlJs({
  // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
  // You can omit locateFile completely when running in node
  locateFile: file => `sql-wasm.wasm`
});

var db;

fetch('pokedex.sql')
  .then(response => response.text())
  .then(body => {
    // Create a database
    db = new SQL.Database();
      db.run(body);
      const res = db.exec("SELECT * FROM pokemon WHERE hp>=100");
      columns = res[0].columns.map(x => { return { title: x } });
      $(document).ready(function() {

        $('#example').DataTable( {
            data: res[0].values,
            columns: columns,
            paging:   false,
        } );

        $("#submit").on("click", function () {
          const command = $("#query").val();
          console.log(command);
          const res = db.exec(command);
          columns = res[0].columns.map(x => { return { title: x } });
          $('#example').DataTable({
            destroy: true,
            data: res[0].values,
            columns: columns,
            paging: false,
          });
        });

        } );
  });
};

my_code();
