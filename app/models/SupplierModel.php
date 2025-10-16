<?php

namespace ajax\models;
use ajax\core\Database;
use PDO;
use Exception;
use PDOException;

class Supplier extends Database {
    
    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM suppliers WHERE activo = 1");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function supplierExists($supplierRif){
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM suppliers where supplierRif =: supplierRif');
        $stmt->execute([]);
    }


}
