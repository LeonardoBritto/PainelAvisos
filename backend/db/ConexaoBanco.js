const firebird = require('node-firebird')

const options = {
  host: 'localhost',
  port: 3050,
  database: 'C:\\Temp\\PAINEIS.FDB',    
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: true, //deixar minusculo
};

function criarDatabase() {
  firebird.attach(options, (err, db) => {
    if (err) {
      console.log('Erro ao conectar ao banco de dados:', err.message);
  
      // Se o banco não existe, cria um novo banco
      if (err.message.includes('I/O error')) {
        createNewDatabase(options.database,)
          .then(() => console.log('Banco de dados criado com sucesso!'))
          .catch((err) => console.log('Erro ao criar banco de dados:', err));
      } else {
        console.log("OLoco meu")
      }
    } else {
      console.log('Conexão bem-sucedida ao banco de dados.');
      db.detach(); // Desconecta do banco de dados após a verificação.
    }
  });
  
  // Função para criar um novo banco de dados
  function createNewDatabase(database) {
    return new Promise((resolve, reject) => {
      const createOptions = Object.assign({}, options);
  
      firebird.create(createOptions, (err, db) => {
        if (err) {
          reject(err);
        } else {
          db.detach(); // Desconecta do novo banco de dados após criá-lo
          resolve();
        }
      });
    });
  }
}

function buscaPorCnpj(cnpj) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM clientes WHERE cnpj = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [cnpj], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });
}

function buscaTodosClientes() {
  return new Promise((resolve, reject) => {
    const query = `SELECT codigo AS id, cnpj, nome, usuario, senha, ipacesso, CASE WHEN ativo = 1 THEN 'Ativo' ELSE 'Inativo' END AS status FROM clientes`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

function inserirCliente(cliente) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO clientes (cnpj, nome, usuario, senha, ipacesso, ativo) VALUES (?, ?, ?, ?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [cliente.cnpj, cliente.nome, cliente.usuario, cliente.senha, cliente.ipacesso, cliente.ativo], (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function editarClientes(cliente, cnpj) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE clientes set cnpj = ?, nome = ?, usuario = ?, senha = ?, ipacesso = ? where cnpj = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [cliente.cnpj, cliente.nome, cliente.usuario, cliente.senha, cliente.ipacesso, cnpj], (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function excluirCliente(cnpj) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM clientes where cnpj = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [cnpj], (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function mudarEstado(cnpj, ativo) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE clientes set ativo = ? where cnpj = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [ativo, cnpj], (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaIp(ip) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM clientes WHERE ipacesso = ?`
    firebird.attach(options, (error, db) => {
      if (error){
        reject(error)
      } else {
        db.query(query, [ip], (error, result) => {
          db.detach()
          if(error)
            reject(error)
          else  
            resolve(result[0])
        })
      }
    })
  })
}

function buscaTodosAvisos() {
  return new Promise((resolve, reject) => {
    const query = `SELECT ci.*, c.nome, SUBSTRING(c.cnpj FROM 1 FOR 2) || '.' ||
                                        SUBSTRING(c.cnpj FROM 3 FOR 3) || '.' ||
                                        SUBSTRING(c.cnpj FROM 6 FOR 3) || '/' ||
                                        SUBSTRING(c.cnpj FROM 9 FOR 4) || '-' ||
                                        SUBSTRING(c.cnpj FROM 13 FOR 2) AS cnpjf, 
                                        cm.*, c.cnpj, 
    CASE WHEN sollistaintaguardciencia like '%Falha%' or sollistaintimacaoautoconfirmada like '%Falha%' or
    sollistaintimacoesrecebidas like '%Falha%' or solintimacaoaguardcienciaato like '%Falha%' or solintimacaoaguardteor like '%Falha%' or
    confleituraintimacaoautoconf like '%Falha%' or sollistacitacoesaguardciencia like '%Falha%' or
    sollistacitacoesautoconfirmada like '%Falha%' or sollistacitacoesrecebidas like '%Falha%' or solcitacaoaguardcienciaato like '%Falha%' or
    solcitacaoaguardteor like '%Falha%' or confleituracitacaoautoconf like '%Falha%' or consultaravisospendentespje like '%Falha%' or
    solintimacaoaguardcienciaatopje like '%Falha%' or solintimacaoaguardteorpje like '%Falha%' or solcitacaoaguardcienciaatopje like '%Falha%' or
    solcitacaoaguardteorpje like '%Falha%' or soloutroaguardcienciaatopje like '%Falha%' or soloutroaguardteorpje like '%Falha%' or 
    consultarprocessopje like '%Falha%' THEN 'Falha'
ELSE 'OK'
END AS status_inter,
CASE WHEN intimacoesnaoloc like '%Falha%' or citacoesnaoloc like '%Falha%' or publicacoesnaoloc like '%Falha%' or
      processosmonitorados like '%Falha%' or processosrequisitorios like '%Falha%' THEN 'Falha'
ELSE 'OK'
END AS status_miner
FROM central_intercomunicacao ci 
inner join clientes c on (ci.codcliente = c.codigo)
inner join central_mineradora cm on(cm.codcliente = c.codigo) order by c.nome asc`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

function buscaAviso(codigo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * from central_intercomunicacao where codcliente = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });
}

function atualizarAvisoCentral(centralOb) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE central_intercomunicacao set data_atualizacao = ?, versaoftp = ?, versaolocal = ?, serviceguardian = ?, central = ?, centralservices = ?, 
                   mineradora = ?, centralmineradora = ?, centralautomatizado = ?, centralhtmlparapdf = ?, centralmanutencao = ?, sollistaintaguardciencia = ?, 
                   sollistaintimacaoautoconfirmada = ?, sollistaintimacoesrecebidas = ?, solintimacaoaguardcienciaato = ?, solintimacaoaguardteor = ?, 
                   confleituraintimacaoautoconf = ?, sollistacitacoesaguardciencia = ?, sollistacitacoesautoconfirmada = ?, sollistacitacoesrecebidas = ?, 
                   solcitacaoaguardcienciaato = ?, solcitacaoaguardteor = ?, confleituracitacaoautoconf = ?, consultaravisospendentespje = ?, 
                   solintimacaoaguardcienciaatopje = ?, solintimacaoaguardteorpje = ?, solcitacaoaguardcienciaatopje = ?, solcitacaoaguardteorpje = ?, 
                   soloutroaguardcienciaatopje = ?, soloutroaguardteorpje = ?, consultarprocessopje = ?, interhoraexecutou = ?, horaintercomunicacao1 = ?,
                   horaintercomunicacao2 = ?, horaintercomunicacao3 = ?, horaintercomunicacao4 = ?, qtdsolicitacoesaberto = ? where codcliente = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, centralOb, (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function inserirAvisoCentral(central) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO central_intercomunicacao (data_atualizacao, versaoftp, versaolocal, serviceguardian, central, centralservices, 
                  mineradora, centralmineradora, centralautomatizado, centralhtmlparapdf, centralmanutencao, sollistaintaguardciencia, 
                  sollistaintimacaoautoconfirmada, sollistaintimacoesrecebidas, solintimacaoaguardcienciaato, 
                  solintimacaoaguardteor, confleituraintimacaoautoconf, sollistacitacoesaguardciencia, sollistacitacoesautoconfirmada,
                  sollistacitacoesrecebidas, solcitacaoaguardcienciaato, solcitacaoaguardteor, confleituracitacaoautoconf, 
                  consultaravisospendentespje, solintimacaoaguardcienciaatopje, solintimacaoaguardteorpje, solcitacaoaguardcienciaatopje,
                  solcitacaoaguardteorpje, soloutroaguardcienciaatopje, soloutroaguardteorpje, consultarprocessopje, interhoraexecutou,
                  horaintercomunicacao1, horaintercomunicacao2, horaintercomunicacao3, horaintercomunicacao4, qtdsolicitacoesaberto, codcliente) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, central, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaTodosAvisosMineradora() {
  return new Promise((resolve, reject) => {
    const query = `SELECT cm.*, c.nome FROM central_mineradora as cm inner join clientes as c on c.codigo = cm.codcliente`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });
}

function buscaAvisoMineradora(codigo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM central_mineradora where codcliente = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });
}

function alterarAvisosCentralMineradora(central) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE central_mineradora set data_atualizacao = ?, intimacoesnaoloc = ?, citacoesnaoloc = ?, publicacoesnaoloc = ?,
                   processosmonitorados = ?, processosrequisitorios = ?, minerarpm = ?, minerarsae = ?, qtdlotesemaberto = ? where codcliente = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, central, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function inserirAvisosCentralMineradora(central) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO central_mineradora (data_atualizacao, intimacoesnaoloc, citacoesnaoloc, publicacoesnaoloc,
                  processosmonitorados, processosrequisitorios, minerarpm, minerarsae, qtdlotesemaberto, codcliente) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, central, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaTodosUsuarios(){
  return new Promise((resolve, reject) => {
    const query = `SELECT codigo as id, nome, login, senha, CASE WHEN nivel = 1 THEN 'Suporte' ELSE 'Administrador' END AS nivel, CASE WHEN ativo = 1 THEN 'Ativo' ELSE 'Inativo' END AS status FROM usuarios`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });  
}

function buscaUsuario(login){
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usuarios where login = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [login], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });  
}

function buscaUsuarioCodigo(codigo){
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM usuarios where codigo = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        });
      }
    });
  });  
}

function inserirUsuario(usuario) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO usuarios (nome, login, senha, nivel, ativo) VALUES (?, ?, ?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [usuario.nome, usuario.login, usuario.senha, usuario.nivel, usuario.ativo], (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function alterarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE usuarios SET nome = ?, login = ?, senha = ?, nivel = ? where codigo = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [usuario.nome, usuario.login, usuario.senha, usuario.nivel, usuario.codigo], (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function excluirUsuario(codigo) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM usuarios where codigo = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function mudarEstadoUsuario(codigo, ativo) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE usuarios set ativo = ? where codigo = ?`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [ativo, codigo], (error) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaTodosLogInter(codigo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT ci.* FROM central_interlog ci 
                  inner join clientes c on (ci.codcliente = c.codigo)
                  where ci.codcliente = ? order by ci.data_atualizacao desc`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

function inserirAvisoCentralInterLog(centralLog) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO central_interlog (data_atualizacao, operacao, codcliente) values(?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, centralLog, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaTodosLogMiner(codigo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT cm.* FROM central_minerlog cm 
                  inner join clientes c on (cm.codcliente = c.codigo)
                  where cm.codcliente = ? order by cm.data_atualizacao desc`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

function inserirAvisoCentralMinerLog(centralLog) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO central_minerlog (data_atualizacao, operacao, codcliente) values(?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, centralLog, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

function buscaTodosLogGuardian(codigo) {
  return new Promise((resolve, reject) => {
    const query = `SELECT cg.* FROM central_guardianlog cg 
                  inner join clientes c on (cg.codcliente = c.codigo)
                  where cg.codcliente = ? order by cg.data_atualizacao desc`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, [codigo], (error, result) => {
          db.detach();
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

function inserirAvisoCentralGuardianLog(centralLog) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO central_guardianlog (data_atualizacao, operacao, codcliente) values(?, ?, ?)`;
    firebird.attach(options, (error, db) => {
      if (error) {
        reject(error);
      } else {
        db.query(query, centralLog, (error) => {
          db.detach();
          if (error) {
            reject(error)
          } else {
            resolve();
          }
        });
      }
    });
  });
}

module.exports = {
  criarDatabase,
  buscaPorCnpj,
  buscaTodosClientes,
  inserirCliente,
  editarClientes,
  excluirCliente,
  mudarEstado,
  buscaIp,
  buscaTodosAvisos,
  buscaAviso,
  atualizarAvisoCentral,
  inserirAvisoCentral,
  buscaTodosAvisosMineradora,
  buscaAvisoMineradora,
  alterarAvisosCentralMineradora,
  inserirAvisosCentralMineradora,
  buscaTodosUsuarios,
  buscaUsuario,
  buscaUsuarioCodigo,
  inserirUsuario,
  alterarUsuario,
  excluirUsuario,
  mudarEstadoUsuario,
  buscaTodosLogInter,
  inserirAvisoCentralInterLog,
  buscaTodosLogMiner,
  inserirAvisoCentralMinerLog,
  buscaTodosLogGuardian,
  inserirAvisoCentralGuardianLog
};
