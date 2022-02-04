import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const alergologia = await prisma.especialidade.upsert({
    where: { nome: 'Alergologia' },
    update: {},
    create: {
      nome: 'Alergologia',
    },
  });

  const angiologia = await prisma.especialidade.upsert({
    where: { nome: 'Angiologia' },
    update: {},
    create: {
      nome: 'Angiologia',
    },
  });

  const bucoMaxilo = await prisma.especialidade.upsert({
    where: { nome: 'Buco maxilo' },
    update: {},
    create: {
      nome: 'Buco maxilo',
    },
  });

  const cardiologiaClinica = await prisma.especialidade.upsert({
    where: { nome: 'Cardiologia clínca' },
    update: {},
    create: {
      nome: 'Cardiologia clínca',
    },
  });

  const cardiologiaInfantil = await prisma.especialidade.upsert({
    where: { nome: 'Cardiologia infantil' },
    update: {},
    create: {
      nome: 'Cardiologia infantil',
    },
  });

  const cirurgiaCabecaPescoco = await prisma.especialidade.upsert({
    where: { nome: 'Cirurgia cabeça e pescoço' },
    update: {},
    create: {
      nome: 'Cirurgia cabeça e pescoço',
    },
  });

  const cirurgiaCardiaca = await prisma.especialidade.upsert({
    where: { nome: 'Cirurgia cardíaca' },
    update: {},
    create: {
      nome: 'Cirurgia cardíaca',
    },
  });

  const cirurgiaTorax = await prisma.especialidade.upsert({
    where: { nome: 'Cirurgia de tórax' },
    update: {},
    create: {
      nome: 'Cirurgia de tórax',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
