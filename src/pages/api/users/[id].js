import { pool } from "../../../Database/db.js";
import defaultHandler from "../../../utils/__defaulthandler.js";

// eslint-disable-next-line import/no-anonymous-default-export

const handler = defaultHandler().get(async (req, res) => {
  try {
    const {
      query: { id }
    } = req;
    const response = await pool.query(
      "SELECT * FROM Cliente INNER JOIN Avance_Fisico ON Cliente.id_cliente = Avance_Fisico.Cliente INNER JOIN Talla ON Cliente.id_cliente = Talla.Cliente WHERE Cliente.id_cliente = ?",
      [id]
    );
    const avanceFisico = await pool.query();
    const response2 = await pool.query("SELECT * FROM Entrenador where id_entrenador = ?", [
      response[0][0].ENTRENADOR
    ]);
    console.log(response[0].ENTRENADOR);
    return res.status(200).json({ ...response[0][0], entrenador: { ...response2[0][0] } });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  // try {
  //   const {
  //     query: { id }
  //   } = req;
  //   const text = "SELECT * FROM Cliente WHERE id = $1";
  //   const values = [id];
  //   const result = await pool.query(text, values);

  //   if (result.rowCount === 0) return res.status(404).json({ message: "Task Not Found" });

  //   return res.json(result.rows[0]);
  // } catch (error) {
  //   return res.status(400).json({ message: error.message });
  // }
});
// .put(async (req, res) => {
//   try {
//     const {
//       query: { id },
//       body: { title, description }
//     } = req;
//     const text = "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
//     const values = [title, description, id];
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// });
// export default async (req, res) => {
//   const {
//     method,
//     body,
//     query: { id },
//   } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const text = "SELECT * FROM Clientes WHERE id = $1";
//         const values = [id];
//         const result = await pool.query(text, values);

//         if (result.rowCount === 0)
//           return res.status(404).json({ message: "Task Not Found" });

//         return res.json(result.rows[0]);
//       } catch (error) {
//         return res.status(400).json({ message: error.message });
//       }
//     case "PUT":
//       try {
//         const { title, description } = body;
//         const text =
//           "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
//         const values = [title, description, id];
//         const result = await pool.query(text, values);
//         return res.json(result.rows[0]);
//       } catch (error) {
//         return res.status(400).json({ message: error.message });
//       }
//     case "DELETE":
//       try {
//         const text = "DELETE FROM tasks WHERE id = $1 RETURNING *";
//         const values = [id];
//         const result = await pool.query(text, values);

//         if (result.rowCount === 0)
//           return res.status(404).json({ message: "Task Not Found" });

//         return res.json(result.rows[0]);
//       } catch (error) {
//         return res.status(400).json({ message: error.message });
//       }
//     default:
//       return res.status(400).json({ message: "Method are not supported" });
//   }
// };
export default handler;
