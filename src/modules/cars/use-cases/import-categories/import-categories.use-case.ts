import { parse as csvParse } from 'csv-parse';
import fs, { createReadStream } from 'fs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@modules/errors/app-error';

import { CreateCategoryUseCase } from '../create-categories/create-categories.use-case';

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject('CreateCategoryUseCase')
    private createCategoryUseCase: CreateCategoryUseCase
  ) {}

  private async loadCategories(file: Express.Multer.File) {
    if (!file.mimetype.includes('csv')) {
      throw new AppError('Invalid file type. Please upload a valid CSV file.');
    }
    const stream = createReadStream(file.path);
    const parseFile = csvParse({
      columns: true,
      trim: true,
      skip_empty_lines: true
    });
    stream.pipe(parseFile);
    return parseFile;
  }

  public async execute(file: Express.Multer.File): Promise<void> {
    const parseFile = await this.loadCategories(file);
    for await (const line of parseFile) {
      try {
        if (line.Categoria && line['Descrição']) {
          console.log(line);
          this.createCategoryUseCase.execute({
            name: line.Categoria,
            description: line['Descrição']
          });
        }
      } catch (error: any) {
        console.error('Erro ao processar a linha:', line, error.message);
      }
    }
    fs.promises.unlink(file.path);
  }
}

export { ImportCategoriesUseCase };
