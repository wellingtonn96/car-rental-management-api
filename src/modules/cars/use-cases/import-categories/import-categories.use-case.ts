import { parse as csvParse } from 'csv-parse';
import { createReadStream } from 'fs';
import { CategoriesRepository } from '../../repositories/categories.repository';
import { CreateCategoryUseCase } from '../create-categories/create-categories.use-case';

class ImportCategoriesUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository,
        private createCategoryUseCase: CreateCategoryUseCase
    ) {}

    private async loadCategories(file: Express.Multer.File) {
        if (!file.mimetype.includes('csv')) {
            throw new Error('Invalid file type. Please upload a valid CSV file.');
        }

        const stream = createReadStream(file.path);

        const parseFile = csvParse({
            columns: true,
            trim: true,
            skip_empty_lines: true,
        });

        stream.pipe(parseFile);
        return parseFile
    }

    public async execute(file: Express.Multer.File): Promise<void> {
        const parseFile = await this.loadCategories(file)
        for await (const line of parseFile) {
            try {
                if (line['Categoria'] && line['Descrição']) {
                    console.log(line);
                    this.createCategoryUseCase.execute({
                        name: line['Categoria'],
                        description: line['Descrição'],
                    });
                }
            } catch (error) {
                console.error('Erro ao processar a linha:', line, error.message);
            }
        }
    }
}

export { ImportCategoriesUseCase };
